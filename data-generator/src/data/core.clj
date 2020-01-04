(ns data.core
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [clojure.pprint :refer (pprint)]
            [data.cols :as cols]))

(declare countries)

(defn extract-rec [data & [level]]
  (let [fun (fn [f* cont collection level parent-value]
              (reduce (fn [c {:keys [value label options countries] :as it}]
                        (let [c (conj c (cond-> it
                                          true (select-keys [:label :value])
                                          countries (assoc :countries countries)
                                          true (assoc :level level)
                                          parent-value (assoc :parent-value parent-value)))]
                          (if (and (some? options) (not-empty options))
                            (f* f* c options (inc level) value)
                            c))) cont collection))]
    (fun fun [] data (or level 0) nil)))

(defn read-resource [resource-url]
  (parse-string (slurp (io/resource resource-url)) keyword))

(defn extract [resource-json-file]
  (let [data (read-resource resource-json-file)]
    (extract-rec data)))

(defn rename-ks [ks]
  (fn [x] (set/rename-keys x ks)))

(defn all-reports []
  (read-resource "ill.json"))

(defn conj* [c v]
  (apply conj c v))

(defn find-v [c v]
  (let [r (first (filter #(= v (:value %)) c))]
    r))

(defn ups! [e]
  (fn[o]
    (if e
      (if o
        (conj o e)
        #{e})
      o)))


(assert (= {:a #{:xx}}
           (-> {}
               (update :a (ups! nil))
               (update :a (ups! :xx)))))

(defn extract-vals [col type-id report-id]
  (fn [xx]
    (let [entity (find-v col type-id)]
      (cond-> xx
          true (update type-id (ups! report-id))
          (:parent-value entity) (update (:parent-value entity) (ups! report-id))))))

(defn freqs [types* sectors* regions*]
  (let [count! #(reduce (fn [c [uuid s]]
                          (assoc c uuid (count s))) {} %)

        res (->> (all-reports)
                 (map #(set/rename-keys % {:sectorIds :sectors
                                           :regionId :region
                                           :typeId :type
                                           :countryId :country})))


        
        ret (reduce (fn [c r]
                      (let [report-id (:id r)]
                        (-> c
                            (update :countries conj (:country r))
                            (update :types (extract-vals types* (:type r) report-id))
                            (update :regions (extract-vals regions* (:region r) report-id))
                            (update
                             :sectors
                             (fn [x]
                               (reduce (fn [c s]
                                         ((extract-vals sectors* s report-id) c)) x (:sectors r))))
                            ))) {:countries [] :types {} :regions {} :sectors {}} res)
        ret2      (-> ret
                      (update :countries frequencies)
                      (update :types count!)
                      (update :regions count!)
                      (update :sectors count!))

        eco (let [freqs* (:countries ret2)
                  eco-regions (filter #(= "1" (:parent-value %)) regions*)]
              (reduce (fn [c reg]
                        (assoc c (:value reg) (reduce (fn [x co]
                                                 (+  x (or (get freqs* (:id co)) 0))
                                                 ) 0 (:countries reg)))
                        ) {} eco-regions))]
    (update ret2 :regions merge eco))
  )
(first (filter #(= "1" (:parent-value %)) (regions)))
(:countries (freqs (types) (sectors) (regions)))
(comment

  (map :name (:regions  (first (filter #(= "Economical" (:label %)) (:regionGroups (all-filters))))))
[:id :name :code]

[:id :name :countries]

  (:countries (first (:regions  (first (filter #(= "Economical" (:label %)) (:regionGroups (all-filters)))))))


  (let [freqs* (:countries (freqs (types) (sectors) (regions)))
        geo-regions (:regions  (first (filter #(= "Economical" (:label %)) (:regionGroups (all-filters)))))]
    (reduce (fn [c reg]
              (conj c (assoc (select-keys reg [:id :name])
                             :counter
                             (reduce (fn [x co]
                                       (+  x (or (get freqs* (:id co)) 0))
                                       ) 0 (:countries reg))))
              ) [] geo-regions)
    
    
    
    )
  

  )


(defn all-filters []
  (read-resource "filters.json"))

(defn types []
  (extract-rec (:types (all-filters))))

(defn regions []
  (->> (:regionGroups (all-filters))
       (map #(assoc %2 :id (str %)) (range))
       (map #(set/rename-keys % {:name :label :id :value :regions :options}))
       (map #(update % :options  (fn [ops]
                                   (map (fn [x]
                                          (-> x
                                              (set/rename-keys {:name :label :id :value})
                                              (update :options (fn [cops]
                                                                 (map (fn [cop] (set/rename-keys cop {:name :label :id :value})) cops)))
                                              )) ops))))
       extract-rec
       ))

(filter (fn [[l v]]
          (contains? (set (map :regionId (all-reports))) v))
        (map (juxt :label :value) (regions)))

(defn countries []
  (let [geographical (first (filter #(= "Geographical" (:label %)) (:regionGroups (all-filters))))
        countries (reduce (fn [c reg]
                            (apply conj c (map (fn [c] (-> c
                                                           (dissoc :name)
                                                           (dissoc :id)
                                                           (assoc :value (:id c))
                                                           (assoc :label (:name c))
                                                           (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                            ) [] (:regions geographical))
        ]
    countries
    ))

(defn sectors []
  (extract-rec (:sectors (all-filters))))

(defn thematics-focus []
  (let [tfs (->> (:thematicFocus (all-filters))
                 (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x)))))]

    (map #(assoc % :col (mod %2 3) :row (quot %2 3)) tfs (range))

    

    )

  )

(defn find-parent-rec [col* v]
  (loop [res [v]
         selected (find-v col* v)]
    (if-let [parent (:parent-value selected)]
      (recur (conj res parent) (find-v col* parent))
      res)))

(find-parent-rec (sectors) "2403af10-fa09-4ba6-9d19-4b6bc0dfab33")

(defn find-children-rec [col* v]
  (let [fun (fn [f* res childs]
              (reduce
               (fn [c {:keys [value]}]
                 (let [cont (conj c value)]
                   (if-let [more (seq (filter #(= value (:parent-value %)) col*))]
                     (apply conj cont (f* f* c more))
                     cont)))
               res
               childs))]
    (fun fun [v] (filter #(= v (:parent-value %)) col*))))

(defn parse-int [s]
  (try
    (Integer. (re-find  #"\d+" s ))
    (catch Exception e nil)))

(defn approval-years []
 (->> (all-reports)
      (filter #(and (some? (:year %)) (not= "" (str/trim (:year %)))))
      (map #(update % :year parse-int))
      (group-by :year)
      (reduce (fn [c [k vs]]
                (assoc c k (count vs))) (sorted-map))
      (reduce (fn [c [k v]] (conj c {:value (str k) :label (format "%s (%s)" k v)} )) [])))

(defn current-year []
  2019)

(defn implementation-periods []
 (->> (all-reports)
      (map (fn [r]
             (let [[init end] (str/split (:implementationPeriod r) #"-")]
               (assoc r :implementationInit (parse-int init) :implementationEnd (or (parse-int end) (current-year))))))
      (filter #(and (some? (:implementationInit %)) (< (:implementationInit %) (:implementationEnd %))))
      (mapcat #(range (:implementationInit %) (inc (:implementationEnd %))))
      frequencies
      sort
      )

  )

(first (all-reports))

(ns server.main
  (:require [clojure.set :as set]
            [server.utils :refer [rename-ks extract-rec to-grid extract-vals
                                  to-clj ->>to-js ->to-js current-year elapsed
                                  parse-int count!]]
            [clojure.string :as str]))

(def value-a 4)

(defonce value-b 4)

(defn reload! []
  (println "Code updated.")
  (println "Trying values:" value-a value-b))

(defn main! []
  (println "App loaded!"))

(def at-thematic-focuses (atom nil))

(def at-reports-clj (atom []))

(def at-reports (atom []))

(def at-filters (atom nil))

(def at-countries (atom nil))

(def at-types (atom nil))

(def at-sectors (atom nil))

(def at-regions (atom nil))

(def at-approvals (atom nil))

(def at-actives (atom nil))

(def at-count-countries (atom nil))

(def at-count-regions (atom nil))

(def at-count-sectors (atom nil))

(def at-count-types (atom nil))

(defn reports [dict data]
  (time (do
          (elapsed "reports")
          (let [dict  (or (to-clj @at-thematic-focuses) (to-clj dict)) 
                res (->> (to-clj data) 
                         (map #(set/rename-keys % {:sectorIds :sectors
                                                   :regionId :region
                                                   :typeId :type
                                                   :countryId :country}))

                         (map #(reduce (fn [rep id]
                                         (assoc rep (keyword (:kw (first (filter (fn [x] (= id(:id x))) dict)))) true)
                                         ) % (:thematicFocus %)))
                         (map #(dissoc %  :thematicFocus))
                         )    
                ]
            (reset! at-reports-clj res)
            (reset! at-reports (->to-js res false))))))

(defn thematic-focus [converted no-convert?]
  (time
   (do
     (elapsed "thematic-focus")
     (->> (:thematicFocus @at-filters)
          (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x))))
          (to-grid 3)          
          (->>to-js no-convert?)
          (reset! at-thematic-focuses)))))

(defn filters-to-atom [data]
  (time
   (do
     (elapsed "filters-to-atom")
     (reset! at-filters (to-clj data)))))

(defn countries []
  (time
   (do
     (elapsed "countries")
     (if @at-countries
       @at-countries
       (let [filters (:regionGroups @at-filters)
             geographical (first (filter #(= "Geographical" (:label %)) filters))
             countries (reduce (fn [c reg]
                                 (apply conj c (map (fn [c] (-> c
                                                                (dissoc :name)
                                                                (dissoc :id)
                                                                (assoc :value (:id c))
                                                                (assoc :label (:name c))
                                                                (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                                 ) [] (:regions geographical))
             countries (sort-by :label countries)]
         (reset! at-countries (->to-js countries false))
         )))))

(defn find-children-rec [col* v]
  (time
   (do
     (elapsed "find-children-rec")
     (let [col* (to-clj col*)
          fun (fn [f* res childs]
                (reduce
                 (fn [c {:keys [value]}]
                   (let [cont (conj c value)]
                     (if-let [more (seq (filter #(= value (:parent-value %)) col*))]
                       (apply conj cont (f* f* c more))
                       cont)))
                 res
                 childs))
          children (fun fun [v] (filter #(= v (:parent-value %)) col*))]
      (clj->js children)))))

(defn types []
  (time
   (do
     (elapsed "types")
     (if @at-types @at-types
         (let [filters (:types @at-filters)]
           (reset! at-types (->to-js (extract-rec filters) false)))))))

(defn sectors []
  (time
   (do
     (elapsed "sectors")          
     (if @at-sectors @at-sectors
         (let [sectors (:sectors @at-filters)]
           (reset! at-sectors (->to-js (extract-rec sectors) false)))))))

(defn regions []
  (time
   (do
     (elapsed "regions")          
     (if @at-regions @at-regions
         (reset! at-regions
                 (->>to-js false
                           (extract-rec
                            (->> (:regionGroups @at-filters)
                                 (map #(if-not (:id %)
                                         (assoc %2 :id (str %))
                                         %) (range))
                                 (map #(set/rename-keys % {:name :label :id :value :regions :options}))
                                 (map #(update % :options
                                               (fn [ops]
                                                 (map (fn [x] (-> x
                                                                  ((rename-ks {:name :label :id :value}))
                                                                  (update :options (fn [cops] (map (rename-ks {:name :label :id :value}) cops)))
                                                                  )) ops))))))))))))

(defn count-thematic-focus [thematic-focus-col]
  (let [reports @at-reports-clj 
        thematic-focus-col (or (to-clj @at-thematic-focuses)
                               (to-clj thematic-focus-col)) 
        counters  (reduce #(assoc % (keyword (:kw %2)) 0) {} thematic-focus-col)]
    (->to-js
     (reduce (fn [cs r]
                       (reduce (fn [c1 c2]
                                 (if (c2 r)
                                   (update c1 c2 inc)
                                   c1
                                   )
                                 ) cs (keys cs))
               ) counters reports)
     false)))

(defn count-countries [] 
  (time
   (do
     (elapsed "count-countries")
     (if @at-count-countries
       @at-count-countries
       (let [reports @at-reports-clj
             ret (reduce (fn [c r]
                           (let [report-id (:id r)]
                             (-> c
                                 (update :countries conj (:country r)))))
                         {:countries []}
                         reports)
             ret2 (-> ret (update :countries frequencies))]
         (reset! at-count-countries (->to-js ret2 false)))))))

(defn count-regions []
  (time
   (do
     (elapsed "count-regions")
     (if @at-count-regions @at-count-regions
         (let [reports @at-reports-clj
               regions (to-clj @at-regions)
               ret (reduce (fn [c r]
                             (let [report-id (:id r)]
                               (-> c
                                   (update :countries conj (:country r))
                                   (update :regions (extract-vals regions (:region r) report-id))

                                   )))
                           {:regions {} :countries []}
                           reports)
               ret2 (-> ret
                        (update :countries frequencies)
                        (update :regions count!))

               eco (let [freqs* (:countries ret2)
                         eco-regions (filter #(= "1" (:parent-value %)) regions)]
                     (reduce (fn [c reg]
                               (assoc c (:value reg) (reduce (fn [x co]
                                                               (+  x (or (get freqs* (:id co)) 0))
                                                               ) 0 (:countries reg)))
                               ) {} eco-regions))
               res (update ret2 :regions merge eco)]
           (reset! at-count-regions (->to-js res false)))))))

(defn count-sectors []
  (time
   (do
     (elapsed "count-sectors")
     (if @at-count-sectors @at-count-sectors
         (let [reports @at-reports-clj
               sectors (to-clj @at-sectors)
               ret (reduce (fn [c r]
                             (let [report-id (:id r)]
                               (-> c
                                   (update
                                    :sectors
                                    (fn [x]
                                      (reduce (fn [c s]
                                                ((extract-vals sectors s report-id) c)) x (:sectors r))))
                                   )))
                           {:sectors {}}
                           reports)
               ret2 (-> ret
                        (update :sectors count!))]
           (reset! at-count-sectors (->to-js ret2 false)))))))

(defn count-types []
  (time
   (do
     (elapsed "count-types")
     (if @at-count-types @at-count-types
         (let [reports @at-reports-clj
               types (to-clj @at-types)
               ret (reduce (fn [c r]
                             (let [report-id (:id r)]
                               (-> c
                                   (update :types (extract-vals types (:type r) report-id))
                                   )))
                           { :types {}}
                           reports)
               ret2 (-> ret
                        (update :types count!))]
           (reset! at-count-types (->to-js ret2 false)))))))

(defn approval-years []
  (time
   (do
     (elapsed "approval-years")
     (if @at-approvals
       @at-approvals
       (let [res (->> @at-reports-clj
                      (filter #(parse-int (:year %)))
                      (map #(update % :year parse-int))
                      (group-by :year)
                      (reduce (fn [c [k vs]]
                                (assoc c k (count vs))) (sorted-map))
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-approvals (->>to-js false res)))))))

(defn active-years []
  (time
   (do
     (elapsed "active-years")
     (if @at-actives
       @at-actives
       (let [res (->> @at-reports-clj
                      (map (fn [r]
                             (let [[init end] (str/split (:implementationPeriod r) #"-")]
                               (assoc r :implementationInit (parse-int init) :implementationEnd (or (parse-int end) (current-year))))))
                      (filter #(and (some? (:implementationInit %)) (< (:implementationInit %) (:implementationEnd %))))
                      (mapcat #(range (:implementationInit %) (inc (:implementationEnd %))))
                      frequencies
                      sort
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-actives (->>to-js false res)))))))

(defn generate-exports []
  #js {:filtersToAtom filters-to-atom
       :reports reports
       :thematicFocus thematic-focus
       :types types
       :sectors sectors
       :regions regions
       :countries countries
       :countThematicFocus count-thematic-focus
       :countCountries count-countries
       :countSectors count-sectors
       :countTypes count-types
       :countRegions count-regions
       :approvalYears approval-years
       :activeYears active-years
       :findChildrenRec find-children-rec})

(ns data.core
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [clojure.pprint :refer (pprint)]
            [data.cols :as cols]))

(defn extract-rec [data & [level]]
  (let [fun (fn [f* cont collection level parent-value]
              (reduce (fn [c {:keys [value label options] :as it}]
                        (let [c (conj c (-> it
                                            (select-keys [:label :value])
                                            (assoc :level level)
                                            (cond-> parent-value (assoc :parent-value parent-value))))]
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

(let [data (take 10 (read-resource "geo-countries.json"))]
  (mapv #(parse-string (:GeoJSON %) keyword) data)
 )
[:CountryID :CountryName :CountryCode :GeoJSON :RecordCount :FillOpacity :MinRecord :MaxRecord]

(comment



  

  

  )

(comment "thematicFocus"
  (let [dict (->> (:thematicFocus (read-resource "filters.json"))
                  (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x)))))
        one (-> (first (read-resource "all-records.json"))
                (set/rename-keys {:sectorIds :sectors
                                  :regionId :region
                                  :typeId :type
                                  :countryId :country}))
        ]  
    
    


    (reduce (fn [rep id]
              (assoc rep (keyword (:kw (first (filter #(= id(:id %)) dict)))) true)
              ) one (:thematicFocus one))

    )
(let [dict (->> (:thematicFocus (read-resource "filters.json"))
                  (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x)))))
      res (->> (read-resource "oll.json")
               (map #(set/rename-keys % {:sectorIds :sectors
                                         :regionId :region
                                         :typeId :type
                                         :countryId :country}))

               (map #(reduce (fn [rep id]
                               (assoc rep (keyword (:kw (first (filter (fn [x] (= id(:id x))) dict)))) true)
                               ) % (:thematicFocus %)))
               (map #(dissoc %  :thematicFocus))
               )
      counters  (reduce #(assoc % (keyword (:kw %2)) 0) {} dict)
        ]  
    
    

  
  (reduce (fn [cs r]
            (reduce (fn [c1 c2]
                      (if (c2 r)
                        (update c1 c2 inc)
                        c1
                        )
                      ) cs (keys cs))
            ) counters res)
  
    )

(keys {:focus_on_trade 0, :trade_information 0, :trade_promotion 0, :trade_facilitation 0, :tvet 0, :poverty_reduction 0, :youth 0, :quality 0, :environment 0, :gender 0, :trade_finance 0, :regional_integration 0})

(sort ["poverty_reduction" "gender" "youth" "environment" "regional_integration" "trade_finance" "trade_information" "tvet" "quality" "trade_facilitation" "trade_promotion" "focus_on_trade"])


  
)

(comment

  (:description :sectorIds :regionId :lastUpdate :typeId :title :year :id :countryId :implementationPeriod :thematicFocus)
  (count (map :typeId  (read-resource "oll.json")))
  2
  (count (distinct  (map :countryId  (read-resource "oll.json"))))
  156
  (count (distinct (mapcat :sectorIds  (read-resource "oll.json"))))
  91

  )

(comment
  (->> (:thematicFocus (read-resource "filters.json"))
       (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x)))))
  

  


  )

(defn all-reports []
  (read-resource "oll.json"))

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
        ]
    (-> ret
        (update :countries frequencies)
        (update :types count!)
        (update :regions count!)
        (update :sectors count!))))



(comment
(:sectors (freqs (types) (sectors) (regions)))
(count (all-reports))
(filter (partial = "663ae2bf-fc55-4064-a1e2-db0af580b635" ) (map :value (regions)))
  1108

  (find-v (sectors) "663ae2bf-fc55-4064-a1e2-db0af580b635") ;; parent
  (find-v (sectors) "2ee2c112-e8be-44fe-b0d8-13169edcf2f4") ;; child
  (find-v (sectors) "80e60b8d-b762-4608-8766-cfd54d3cc282") ;; child 
  (get h "663ae2bf-fc55-4064-a1e2-db0af580b635")
  (get h "2ee2c112-e8be-44fe-b0d8-13169edcf2f4")
  (get h "80e60b8d-b762-4608-8766-cfd54d3cc282")
  (get (:regions (freqs (types) (sectors) (regions))) "663ae2bf-fc55-4064-a1e2-db0af580b635") ;; 47
  (get (:sectors (freqs)) "2ee2c112-e8be-44fe-b0d8-13169edcf2f4") ;; 18
  (get (:sectors (freqs)) "80e60b8d-b762-4608-8766-cfd54d3cc282") ;; 46
  (+ 47 18 46)

  (comment "xample count rec"
           (get ss "2ee2c112-e8be-44fe-b0d8-13169edcf2f4")
           (find-v (sectors) "80e60b8d-b762-4608-8766-cfd54d3cc282")
           (get (count-rec (sectors) (:sectors (freqs))) "663ae2bf-fc55-4064-a1e2-db0af580b635") ;; 94
           (get (count-rec (sectors) (:sectors (freqs))) "80e60b8d-b762-4608-8766-cfd54d3cc282") ;; 46
           (get (count-rec (sectors) (:sectors (freqs))) "2ee2c112-e8be-44fe-b0d8-13169edcf2f4") ;; 18         
           ))



(defn all-filters []
  (read-resource "filters.json"))

(defn types []
  (extract-rec (:types (all-filters))))

(defn regions []
  (->> (:regionGroups (all-filters))
       (map #(assoc %2 :id (str %)) (range))
       (map #(set/rename-keys % {:name :label :id :value :regions :options}))
       (map #(update % :options  (fn [ops]
                                   (map (fn [x] (-> x
                                                    (dissoc :countries)
                                                    (set/rename-keys {:name :label :id :value})
                                                    (update :options (fn [cops]
                                                                       (map (fn [cop] (set/rename-keys cop {:name :label :id :value})) cops)))
                                                    )) ops))))
       extract-rec
       ))

(regions)

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



(comment
  (find-parent-rec (sectors) "d2bb2c05-faf3-45dd-b735-97ef1a4e7b44")
  (find-children-rec (sectors) "7f21856c-6ff6-4ffa-9796-0082549bd11f")

  )





(comment "sectors consistency"
 (let [reps (take 10 (set (mapcat :sectorIds (all-reports))))
       fils (set (map :value (sectors) ))]
   (count (set/intersection reps fils))))


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

(comment "intersections"

  (set/intersection (set (filter some? (map :value (sectors))))
                          (set (filter some? (keys (:sectors (freqs))))))         
  (set/intersection (set (filter some? (map :value (regions))))
                    (set (filter some? (keys (:regions (freqs))))))

  (set/intersection (set (filter some? (map :value (types))))
                    (set (filter some? (keys (:types (freqs))))))

  (set/intersection (set (map :value (countries)))
                    (set (filter some? (keys (:countries (freqs))))))

  )

(comment
  (let [{:keys [regionGroups sectors types ]} (parse-string (slurp (io/resource "all-selects.json")) keyword)]

    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/regions.json")]
      (.write wrtr (generate-string regionGroups))
      )

    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/sectors.json")]
      (.write wrtr (generate-string sectors))
      )

    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/types.json")]
      (.write wrtr (generate-string types))
      )

    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/sectors2.json")]
      (.write wrtr (generate-string (extract "sectors.json")))
      )
(extract-rec (:types (read-resource "filters.json")))
    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/types2.json")]
      (.write wrtr (generate-string (extract "types.json")))
      )
    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/regions2.json")]
      (let [regions (read-resource "regions.json")
            all (->> regions
                     (reduce #(apply conj % (:regions %2)) [])
                     (map #(set/rename-keys % {:name :label :id :value})))]
       (.write wrtr  (generate-string (extract-rec all)))))

    (let [regions (read-resource "regions.json")
          [geo eco] (->> regions
                         (map #(assoc % :value nil))
                         
                         (map #(update % :regions (fn [rr] (reduce (fn [c i] (conj c (-> i
                                                                                         (dissoc :countries)
                                                                                         (assoc :value (:id i))
                                                                                         (assoc :label (:name i))))) [] rr))))
                         
                         (map #(set/rename-keys % {:regions :options}))
                         )]
      (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/regions3.json")]
        (.write wrtr  (generate-string [{:label (:label geo)
                                          :level 0
                                         :options (extract-rec (:options geo) 1)}
                                        {:label (:label eco)
                                         :level 0
                                         :options (extract-rec (:options eco) 1)}]
                                       ))))
    
    )

  (let [regions (read-resource "regions.json")
        countries (->> regions
                       (reduce #(apply conj % (:regions %2)) [])
                       (mapcat :countries)
                       (filter #(some? (:name %)))
                       (reduce #(conj % (set/rename-keys %2 {:name :label :id :value})) #{}))]
    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/countries.json")]
      (.write wrtr  (generate-string countries))
      ))
  
  
 )

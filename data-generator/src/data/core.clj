(ns data.core
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [clojure.pprint :refer (pprint)]
            [data.cols :as cols]))

(defn extract-rec [data & [level]]
  (let [fun (fn [f* cont collection level]
              (reduce (fn [c {:keys [value label options] :as it}]
                        (let [c (conj c (-> it
                                            (select-keys [:label :value])
                                            (assoc :level level)))]
                          (if (and (some? options) (not-empty options))
                            (f* f* c options (inc level))
                            c))) cont collection))]
    (fun fun [] data (or level 0))))

(defn read-resource [resource-url]
  (parse-string (slurp (io/resource resource-url)) keyword))

(defn extract [resource-json-file]
  (let [data (read-resource resource-json-file)]
    (extract-rec data)))

(defn rename-ks [ks]
  (fn [x] (set/rename-keys x ks)))

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

(defn freqs []
  (let [res (->> (all-reports)
                 (map #(set/rename-keys % {:sectorIds :sectors
                                           :regionId :region
                                           :typeId :type
                                           :countryId :country})))
        ret (reduce (fn [c r]
                      (-> c
                          (update :countries conj (:country r))
                          (update :types conj (:type r))
                          (update :regions conj (:region r))
                          (update :sectors #(apply conj % (:sectors r)))
                          )) {:countries [] :types [] :regions [] :sectors []} res)
        ]
    (-> ret
        (update :countries frequencies)
        (update :types frequencies)
        (update :regions frequencies)
        (update :sectors frequencies))
    ))

(defn all-filters []
  (read-resource "filters.json"))

(defn types []
  (extract-rec (:types (all-filters))))

(defn regions []
  (->> (:regionGroups (all-filters))
      (map #(set/rename-keys % {:name :label :id :value :regions :options}))
      (map #(update % :options  (fn [ops]
                                  (map (fn [x] (-> x
                                                   (dissoc :countries)
                                                   (set/rename-keys {:name :label :id :value})
                                                   (update :options (fn [cops]
                                                                      (map                                                   (fn [cop] (set/rename-keys cop {:name :label :id :value})) cops)
                                                                      ))
                                                   )) ops))))
      extract-rec
      ))

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

(defn parse-int [s]
  (Integer. (re-find  #"\d+" s )))

(defn approval-years []
 (->> (all-reports)
      (filter #(and (some? (:year %)) (not= "" (str/trim (:year %)))))
      (map #(update % :year parse-int))
      (group-by :year)
      (reduce (fn [c [k vs]]
                (assoc c k (count vs))) (sorted-map))
      (reduce (fn [c [k v]] (conj c {:value (str k) :label (format "%s (%s)" k v)} )) [])))


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

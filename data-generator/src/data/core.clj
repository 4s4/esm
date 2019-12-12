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
(->> (:regionGroups (read-resource "filters.json"))
     (map #(set/rename-keys % {:name :label :id :value :regions :options}))
     (map #(update % :options
                   (fn [ops]
                     (map (fn [x] (-> x
                                      ((rename-ks {:name :label :id :value :countries :options}))
                                      (update :options (fn [cops] (map (rename-ks {:name :label :id :value}) cops)))
                                      )) ops))))
     extract-rec
     )
(comment



  (->> (:regionGroups (read-resource "filters.json"))
      (map #(set/rename-keys % {:name :label :id :value :regions :options}))
      (map #(update % :options  (fn [ops]
                                  (map (fn [x] (-> x
                                                   (set/rename-keys {:name :label :id :value :countries :options})
                                                   (update :options (fn [cops]
                                                                      (map                                                   (fn [cop] (set/rename-keys cop {:name :label :id :value})) cops)
                                                                      ))
                                                   )) ops))))
      extract-rec
      ))
{:id "6ddfbd90-5c29-4828-a83e-03f74b92ae0d", :name "Namibia", :code "NAM"}
(:id :name :countries)


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
      res (->> (read-resource "all-records.json")
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
    
    



  (take 1 res)
    )

({:description "The paper serves as support of the African Development Bank for the implementation of the Government’s Fourth National Development Plan (NDP4) for the period 2012/13-2016/17, which emphasizing high and sustainable growth, employment creation, and reducing income inequality. The report is concentrated on infrastructure with a focus on transport, energy and water; and private sector development through skills development and improving the regulatory environment.", :focus_on_trade true, :trade_information true, :sectors [], :trade_promotion true, :lastUpdate "10 Feb 2016", :type "27c77bd7-69f5-42c2-9413-f3cc3b9ade78", :trade_facilitation true, :title "COUNTRY STRATEGY PAPER 2014-2018 SARC", :region "d380856d-ddca-4995-9cc5-51179abc00f6", :year "2014", :tvet true, :poverty_reduction true, :id "ac79e8f2-4f15-4cc4-b645-0034af8fa90e", :youth true, :implementationPeriod "2014-2018", :quality true, :environment true, :gender true, :trade_finance true, :country "6ddfbd90-5c29-4828-a83e-03f74b92ae0d", :regional_integration true})
  
)
(comment 
  (count (into #{}  (map :typeId  (read-resource "all-records.json"))))
  (count (distinct (mapcat :sectorIds  (read-resource "all-records.json"))))
  (count (distinct (map :value (extract-rec (:sectors (read-resource "filters.json"))))))
  )

(comment
  (->> (:thematicFocus (read-resource "filters.json"))
       (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x)))))
  
  (let [geographical (first (filter #(= "Geographical" (:label %)) (:regionGroups (read-resource "filters.json"))))
        countries (reduce (fn [c reg]
                            (apply conj c (map (fn [c] (-> c
                                                           (dissoc :name)
                                                           (assoc :label (:name c))
                                                           (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
              ) [] (:regions geographical))
        ]
    (count countries)
    )
  


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





(def r (take 100 (cycle [true false false true])))

(def checks [:environment :export_strategy :gender :poverty_reduction
             :quality :regional :regional_integration :trade_facilitation
             :trade_finance :trade_focus :trade_information :trade_promotion :tvet :youth])

(defn more-checks []
  (reduce  (fn [c a] (assoc c a (rand-nth r)))  {}
           checks))

(more-checks)

(defn few [c]
 (vec (take (rand-int 5) (shuffle c))))

(defn one [c]
 (first (shuffle c)))


(def keys* (apply conj
                  [:country :countryCode
                   :recordDocumentDescription :impStartDate
                   :impEndDate
                   :lastUpdate :region
                   :sectorName :recordName :year]
                  checks))

(defn report []
  (let [i-p (one cols/implementation-periods)]
    (-> (more-checks)
        (assoc :region (one cols/regions))
        (assoc :documentType (one cols/types))
        (assoc :country (one cols/countries))
        (assoc :countryCode (one cols/country-codes))
        (assoc :title (one cols/titles))
        (assoc :recordDocumentDescription (one cols/descriptions))
        (assoc :sectorName (few cols/sectors))
        (assoc :year (- (Integer/parseInt (first (str/split i-p #"-"))) (rand-int 3)))
        (assoc :implementationPeriod i-p)
        (assoc :lastUpdate (one cols/last-updates)))))

(defn generate-file []
  (let [data (atom [])]
    (doseq [_ (range 1800)]
      (swap! data conj (report)))
    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/app/js/data.json")]
      (.write wrtr (generate-string @data))
      )))







[{:value "1284f11c-beee-49f3-91ff-95d42691fa1f", :label "National", :options nil} {:value "00000000-0000-0000-0000-000000000000", :label "International", :options [{:value "916e18cc-8dbc-4358-8fe6-2dd57b054a09", :label "DTIS", :options nil} {:value "09ab7c4e-49ee-425d-92fe-9661d79fb004", :label "NES-ITC", :options nil} {:value "2faaa754-89be-46f2-8468-e15cb7924d28", :label "Other", :options nil} {:value "f783f867-7cac-46e4-83d4-f2a50774d984", :label "PRSP", :options nil} {:value "e0c2b847-ffc5-421f-a0aa-4a2f90ad8408", :label "SES-ITC", :options nil} {:value "a70487e5-9325-4255-b770-8b9ceca4ce89", :label "UNDAF", :options nil}]}]

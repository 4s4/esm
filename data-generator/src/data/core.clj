(ns data.core
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [data.cols :as cols]))


(defn extract-rec [data]
  (let [fun (fn [f* cont collection]
              (reduce (fn [c {:keys [value label options] :as it}]
                        (let [c (conj c (select-keys it [:label :value]))]
                          (if (and (some? options) (not-empty options))
                            (f* f* c options)
                            c))
                        
                        ) cont collection))]
    (fun fun #{} data)))

(defn read-resource [resource-url]
  (parse-string (slurp (io/resource resource-url)) keyword))

(defn extract [resource-json-file]
  (let [data (read-resource resource-json-file)]
    (extract-rec data)))





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

    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/types2.json")]
      (.write wrtr (generate-string (extract "types.json")))
      )
    (with-open [wrtr (io/writer "/Users/tangrammer/git/6s6/esm/data-generator/resources/regions2.json")]
      (let [regions (read-resource "regions.json")
            all (->> regions
                     (reduce #(apply conj % (:regions %2)) [])
                     (map #(set/rename-keys % {:name :label :id :value})))]
       (.write wrtr  (generate-string (extract-rec all)))))
    
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

(defn more-checks []
  (reduce  (fn [c a] (assoc c (keyword a) (rand-nth r)))  {}
           ["environment" "gender" "poverty_reduction" "export_strategy" "trade_focus"
	    "youth" "trade_facilitation" "trade_finance" "trade_information" "trade_promotion" "quality"
	    "tvet" "regional" "regional_integration"]))

(more-checks)

(defn few [c]
 (vec (take (rand-int 5) (shuffle c))))

(defn one [c]
 (first (shuffle c)))


(def keys* (apply conj
                  [:region
                   :country
                   :countryCode
                   :title
                   :description
                   :sectors
                   :year
                   :implementationPeriod
                   :lastUpdate]
                  [:environment :gender :poverty_reduction :export_strategy :trade_focus :youth :trade_facilitation :trade_finance :trade_information :trade_promotion :quality :tvet :regional :regional_integration]))

(defn report []
  (let [i-p (one cols/implementation-periods)]
    (-> (more-checks)
        (assoc :region (one cols/regions))
        (assoc :type (one cols/types))
        (assoc :country (one cols/countries))
        (assoc :countryCode (one cols/country-codes))
        (assoc :title (one cols/titles))
        (assoc :description (one cols/descriptions))
        (assoc :sectors (few cols/sectors))
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







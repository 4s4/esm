(ns data.mock
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.set :as set]
            [clojure.string :as str]
            [clojure.pprint :refer (pprint)]
            [data.cols :as cols]))


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

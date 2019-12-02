(ns data.core
  (:require [cheshire.core :refer :all]
            [clojure.java.io :as io]
            [clojure.string :as str]
            [data.cols :as cols]))

(def r (take 100 (cycle [true false false true])))

(defn more-checks []
  (reduce  (fn [c a] (assoc c (keyword a) (rand-nth r)))  {}
           ["environment" "gender" "poverty_reduction" "export_strategy" "trade_focus"
	    "youth" "trade_facilitation" "trade_finance" "trade_information" "trade_promotion" "quality"
	    "tvet" "regional" "regional_integration"]))

(more-checks)

(defn few [c]
 (vec (take (rand-int (count c)) (shuffle c))))

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







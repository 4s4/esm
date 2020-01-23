(ns server.utils
  (:require [clojure.set :as set]
            [clojure.string :as str]))

(defn elapsed [m]
  (println "elapsed " m))

(defn to-clj [o]
  (time
   (do
     (elapsed "to-clj")
     (js->clj o :keywordize-keys true))))

(defn ->>to-js [no-convert? o]
  (if no-convert? o (time
                     (do
                       (elapsed "clj->js")
                       (clj->js o)))))

(defn ->to-js [o no-convert?]
  (->>to-js no-convert? o))

(defn to-grid [n col*]
  (map #(assoc %2 :col (mod % n) :row (quot % n)) (range) col*))


(defn extract-rec [data & [level]]
  (let [fun (fn [f* cont collection level parent-value]
              (reduce (fn [c {:keys [value label options countries] :as it}]
                        (let [c (conj c (cond-> it
                                          true (select-keys [:label :value])
                                          true (assoc :level level)
                                          countries (assoc :countries countries)
                                          parent-value (assoc :parent-value parent-value)))]
                          (if (and (some? options) (not-empty options))
                            (f* f* c options (inc level) value)
                            c))) cont collection))]
    (fun fun [] data (or level 0) nil)))

(defn rename-ks [ks] (fn [x] (set/rename-keys x ks)))

(defn- find-v [c v]
  (first (filter #(= v (:value %)) c)))

(defn ups! [e]
  (fn[o]
    (if e
      (if o
        (conj o e)
        #{e})
      o)))

(defn extract-vals [col type-id report-id]
  (fn [xx]
    (let [entity (find-v col type-id)]
      (cond-> xx
          true (update type-id (ups! report-id))
          (:parent-value entity) (update (:parent-value entity) (ups! report-id))))))

(def count! #(reduce (fn [c [uuid s]]
                       (assoc c uuid (count s))) {} %))

(defn parse-int [s]
  (when (and (some? s))
    (let [res (js/parseInt  (re-find  #"\d+" s))]
      (when (integer? res) res))))

(defn current-year []
  (.getFullYear (js/Date.)))

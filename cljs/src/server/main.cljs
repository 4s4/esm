
(ns server.main
  (:require [clojure.set :as set]
            [clojure.string :as str]))

(def value-a 4)

(defonce value-b 4)

(defn reload! []
  (println "Code updated.")
  (println "Trying values:" value-a value-b))

(defn main! []
  (println "App loaded!"))

(defn hello [o]
  (let [data (js->clj o :keywordize-keys true)]
    (println data)
    (str "hello"  data)))

(defn reports [dict data]
  (let [dict (js->clj dict :keywordize-keys true) 
        res (->> (js->clj data :keywordize-keys true) 
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
    (clj->js res)
    ))

(defn thematic-focus [data]
  (->> (:thematicFocus (js->clj data :keywordize-keys true))
       (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x))))
       clj->js))

(defn countries [data]
  (let [filters (:regionGroups (js->clj data :keywordize-keys true))
        geographical (first (filter #(= "Geographical" (:label %)) filters))
        countries (reduce (fn [c reg]
                            (apply conj c (map (fn [c] (-> c
                                                           (dissoc :name)
                                                           (assoc :label (:name c))
                                                           (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                            ) [] (:regions geographical))]

    (clj->js (sort-by :label countries))))

(defn generate-exports []
  #js {:hello hello
       :reports reports
       :thematicFocus thematic-focus
       :countries countries})

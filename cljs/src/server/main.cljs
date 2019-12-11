
(ns server.main)

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
       :countries countries})

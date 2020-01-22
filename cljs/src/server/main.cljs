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

(defn to-clj [o]
  (js->clj o :keywordize-keys true))

(defn ->>to-js [no-convert? o]
  (if no-convert? o (clj->js o)))

(defn ->to-js [o no-convert?]
  (->>to-js no-convert? o))

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

(defn to-grid [n col*]
  (map #(assoc %2 :col (mod % n) :row (quot % n)) (range) col*))

(defn thematic-focus [data converted no-convert?]
  (->> (:thematicFocus (if converted data (to-clj data)))
       (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x))))
       (to-grid 3)
       (->>to-js no-convert?)))

(defn grid [data n]
  (clj->js (to-grid n (js->clj data))))

(defn countries [data]
  (let [filters (:regionGroups (js->clj data :keywordize-keys true))
        geographical (first (filter #(= "Geographical" (:label %)) filters))
        countries (reduce (fn [c reg]
                            (apply conj c (map (fn [c] (-> c
                                                           (dissoc :name)
                                                           (dissoc :id)
                                                           (assoc :value (:id c))
                                                           (assoc :label (:name c))
                                                           (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                            ) [] (:regions geographical))]

    (clj->js (sort-by :label countries))))

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


(defn find-children-rec [col* v]
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
    (clj->js children)))

(defn types [data]
  (let [filters (:types (js->clj data :keywordize-keys true))]

    (clj->js (extract-rec filters))))

(defn sectors [data]
  (let [sectors (:sectors (js->clj data :keywordize-keys true))]
    (clj->js (extract-rec sectors))))

(defn rename-ks [ks] (fn [x] (set/rename-keys x ks)))


(defn regions [data]
  (clj->js
   (extract-rec
    (->> (:regionGroups (js->clj data :keywordize-keys true))
         (map #(if-not (:id %)
                 (assoc %2 :id (str %))
                 %) (range))
         (map #(set/rename-keys % {:name :label :id :value :regions :options}))
         (map #(update % :options
                       (fn [ops]
                         (map (fn [x] (-> x
                                          ((rename-ks {:name :label :id :value}))
                                          (update :options (fn [cops] (map (rename-ks {:name :label :id :value}) cops)))
                                          )) ops))))))))

;; (if (and (not (string? value)) (not (number? value))) (js->clj value :keywordize-keys true) value)


(defn assoc-in-state [state path-value-col]
  (let [
        state (js->clj state :keywordize-keys true)
        path-value-col (js->clj path-value-col :keywordize-keys true)
        res (reduce (fn [c [path value]]
                      (assoc-in c (map keyword path) value)) state path-value-col)]
    (clj->js res)))

(comment (println #js ["a" "b"])
         (println  (assoc-in-state #js {:a 1 :b {:c 5}} #js [[["a"] 3] [["b" "c"] 8]]))
         
         (println "ja"))

(defn count-thematic-focus [reports thematic-focus-col converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        thematic-focus-col (if converted thematic-focus-col (to-clj thematic-focus-col)) 
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
     no-convert?)))

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
(defn count-countries [reports converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        ret (reduce (fn [c r]
                      (let [report-id (:id r)]
                        (-> c
                            (update :countries conj (:country r)))))
                    {:countries []}
                    reports)
        ret2 (-> ret (update :countries frequencies))]
    (->to-js ret2 no-convert?)))

(defn count-regions [reports regions converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        regions (if converted regions (to-clj regions))
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
        ]
    (->to-js (update ret2 :regions merge eco) no-convert?)))

(defn count-sectors [reports sectors converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        sectors (if converted sectors (to-clj sectors))
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
    (->to-js ret2 no-convert?)))

(defn count-types [reports types converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        types (if converted types (to-clj types))
        ret (reduce (fn [c r]
                      (let [report-id (:id r)]
                        (-> c
                            (update :types (extract-vals types (:type r) report-id))
                            )))
                    { :types {}}
                    reports)
        ret2 (-> ret
                 (update :types count!))]
    (->to-js ret2 no-convert?)))

(defn count-selects [reports types sectors regions converted no-convert?]
  (let [reports (if converted reports (to-clj reports))
        types (if converted types (to-clj types))
        regions (if converted regions (to-clj regions))
        sectors (if converted sectors (to-clj sectors))
        ret (reduce (fn [c r]
                      (let [report-id (:id r)]
                        (-> c
                            (update :countries conj (:country r))
                            (update :types (extract-vals types (:type r) report-id))
                            (update :regions (extract-vals regions (:region r) report-id))
                            (update
                             :sectors
                             (fn [x]
                               (reduce (fn [c s]
                                         ((extract-vals sectors s report-id) c)) x (:sectors r))))
                            )))
                    {:countries [] :types {} :regions {} :sectors {}}
                    reports)
        ret2 (-> ret
                 (update :countries frequencies)
                 (update :types count!)
                 (update :regions count!)
                 (update :sectors count!))

        eco (let [freqs* (:countries ret2)
                  eco-regions (filter #(= "1" (:parent-value %)) regions)]
              (reduce (fn [c reg]
                        (assoc c (:value reg) (reduce (fn [x co]
                                                        (+  x (or (get freqs* (:id co)) 0))
                                                        ) 0 (:countries reg)))
                        ) {} eco-regions))
        ]
    (->to-js (update ret2 :regions merge eco) no-convert?)))

(defn parse-int [s]
  (when (and (some? s))
    (let [res (js/parseInt  (re-find  #"\d+" s))]
      (when (integer? res) res))))

(defn approval-years [reports converted no-convert?]
 (->> (if converted reports (to-clj reports))
      (filter #(parse-int (:year %)))
      (map #(update % :year parse-int))
      (group-by :year)
      (reduce (fn [c [k vs]]
                (assoc c k (count vs))) (sorted-map))
      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) [])
      (->>to-js no-convert?)))

(defn current-year []
  (.getFullYear (js/Date.)))

(defn active-years [reports converted no-convert?]
  (->> (if converted reports (to-clj reports))
       (map (fn [r]
              (let [[init end] (str/split (:implementationPeriod r) #"-")]
                (assoc r :implementationInit (parse-int init) :implementationEnd (or (parse-int end) (current-year))))))
       (filter #(and (some? (:implementationInit %)) (< (:implementationInit %) (:implementationEnd %))))
       (mapcat #(range (:implementationInit %) (inc (:implementationEnd %))))
       frequencies
       sort
       (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) [])
       (->>to-js no-convert?)))

(defn geo-countries [data reports]
  (let[d         (to-clj data)
       d2        (filter #(and ((complement seq?) (:GeoJSON %)) (some? (-> (:GeoJSON %) :features first :id))) d)
       d3        (map #(assoc % :coords (let [cc (-> % :GeoJSON :features first :geometry :coordinates first first)]
                                          (if (-> cc first sequential?)
                                            (-> cc first)
                                            cc))) d2)
       ff       (->>  (to-clj reports)
                      (map :country)
                      frequencies)
       max*     (apply max (vals ff))
       min*     (apply min (vals ff))
       fill-fun (fn [x] (double (* 0.9  x (/ min* max*))))
       d4        (map #(let [c (get ff (:CountryID %) 0)]
                         (assoc  %  :RecordCount c :FillOpacity (fill-fun c)))
                      d3)]
    (clj->js (filter #(pos? (:RecordCount %)) d4))))

(defn generate-exports []
  #js {:reports reports
       :assocIn assoc-in-state
       :thematicFocus thematic-focus
       :types types
       :grid grid
       :sectors sectors
       :regions regions
       :countries countries
       :countThematicFocus count-thematic-focus
       :countSelects count-selects
       :countCountries count-countries
       :countSectors count-sectors
       :countTypes count-types
       :countRegions count-regions
       :approvalYears approval-years
       :activeYears active-years
       :geoCountries geo-countries
       :findChildrenRec find-children-rec})

(comment "test types"
         (types #js {:types [{:value "1284f11c-beee-49f3-91ff-95d42691fa1f", :label "National", :options nil} {:value "00000000-0000-0000-0000-000000000000", :label "International", :options [{:value "916e18cc-8dbc-4358-8fe6-2dd57b054a09", :label "DTIS", :options nil} {:value "09ab7c4e-49ee-425d-92fe-9661d79fb004", :label "NES-ITC", :options nil} {:value "2faaa754-89be-46f2-8468-e15cb7924d28", :label "Other", :options nil} {:value "f783f867-7cac-46e4-83d4-f2a50774d984", :label "PRSP", :options nil} {:value "e0c2b847-ffc5-421f-a0aa-4a2f90ad8408", :label "SES-ITC", :options nil} {:value "a70487e5-9325-4255-b770-8b9ceca4ce89", :label "UNDAF", :options nil}]}]})
         

         )

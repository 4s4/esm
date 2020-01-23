(ns server.main
  (:require [clojure.set :as set]
            [server.utils :refer [rename-ks extract-rec to-grid extract-vals
                                  to-clj ->>to-js ->to-js current-year elapsed
                                  parse-int count!]]
            [clojure.string :as str]))

(def value-a 4)

(defonce value-b 4)

(defn reload! []
  (println "Code updated.")
  (println "Trying values:" value-a value-b))

(defn main! []
  (println "App loaded!"))

(def at-thematic-focuses (atom nil))

(def at-reports (atom []))

(def at-filters (atom nil))

(def at-approvals (atom nil))

(def at-actives (atom nil))

(def at-count-countries (atom nil))

(defn reports [dict data]
  (time (do
          (elapsed "reports")
          (let [dict  (or @at-thematic-focuses (to-clj dict)) 
                res (->> (to-clj data) 
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
            (reset! at-reports res)
            (->to-js res false)))))

(defn thematic-focus [data converted no-convert?]
  (time (do (elapsed "thematic-focus")
           (->> (:thematicFocus (if converted data (to-clj data)))
                (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x))))
                (to-grid 3)
                (reset! at-thematic-focuses)
                (->>to-js no-convert?)))))

(defn countries [data]
  (time
   (do
     (elapsed "countries")
     (let [data (to-clj data)
           _ (reset! at-filters data)
           filters (:regionGroups data)
           geographical (first (filter #(= "Geographical" (:label %)) filters))
           countries (reduce (fn [c reg]
                               (apply conj c (map (fn [c] (-> c
                                                              (dissoc :name)
                                                              (dissoc :id)
                                                              (assoc :value (:id c))
                                                              (assoc :label (:name c))
                                                              (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                               ) [] (:regions geographical))]
       (->to-js (sort-by :label countries) false)))))

(defn find-children-rec [col* v]
  (time
   (do
     (elapsed "find-children-rec")
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
      (clj->js children)))))

(defn types [data]
  (time
   (do
     (elapsed "types")
     (let [filters (:types (or @at-filters (to-clj data)))]
       (->to-js (extract-rec filters) false)))))

(defn sectors [data]
  (time
   (do
     (elapsed "sectors")          
     (let [sectors (:sectors (or @at-filters (to-clj data)))]
         (->to-js (extract-rec sectors) false)))))

(defn regions [data]
  (time
   (do
     (elapsed "regions")          
     (->>to-js false
      (extract-rec
       (->> (:regionGroups (or @at-filters (to-clj data)))
            (map #(if-not (:id %)
                    (assoc %2 :id (str %))
                    %) (range))
            (map #(set/rename-keys % {:name :label :id :value :regions :options}))
            (map #(update % :options
                          (fn [ops]
                            (map (fn [x] (-> x
                                             ((rename-ks {:name :label :id :value}))
                                             (update :options (fn [cops] (map (rename-ks {:name :label :id :value}) cops)))
                                             )) ops))))))))))

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

(defn count-countries [reports converted no-convert?] 
  (println "count countries empty reports???" (count @at-reports))
  (time
   (do
     (elapsed "count-countries")
     (if @at-count-countries
       (->to-js @at-count-countries false)
       (let [reports (if converted reports (or @at-reports (to-clj reports)))
             ret (reduce (fn [c r]
                           (let [report-id (:id r)]
                             (-> c
                                 (update :countries conj (:country r)))))
                         {:countries []}
                         reports)
             ret2 (-> ret (update :countries frequencies))]
         (reset! at-count-countries ret2)
         (->to-js ret2 no-convert?))))))

(defn count-regions [reports regions converted no-convert?]
  (time
   (do
     (elapsed "count-regions")
     (let [reports (if converted reports (or @at-reports (to-clj reports)))
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
      (->to-js (update ret2 :regions merge eco) no-convert?)))))

(defn count-sectors [reports sectors converted no-convert?]
  (time
   (do
     (elapsed "count-sectors")
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
      (->to-js ret2 no-convert?)))))

(defn count-types [reports types converted no-convert?]
  (time
   (do
     (elapsed "count-types")
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
       (->to-js ret2 no-convert?)))))

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

(defn approval-years [reports converted no-convert?]
  (time
   (do
     (elapsed "approval-years")
     (if @at-approvals
       (->to-js @at-approvals false)       
       (let [res (->> (if converted reports (or @at-reports (to-clj reports)))
                      (filter #(parse-int (:year %)))
                      (map #(update % :year parse-int))
                      (group-by :year)
                      (reduce (fn [c [k vs]]
                                (assoc c k (count vs))) (sorted-map))
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-approvals res)
         (->>to-js no-convert? res))))))

(defn active-years [reports converted no-convert?]
  (time
   (do
     (elapsed "active-years")
     (if @at-actives
       (->>to-js false @at-actives)
       (let [res (->> (if converted reports (or @at-reports (to-clj reports)))
                      (map (fn [r]
                             (let [[init end] (str/split (:implementationPeriod r) #"-")]
                               (assoc r :implementationInit (parse-int init) :implementationEnd (or (parse-int end) (current-year))))))
                      (filter #(and (some? (:implementationInit %)) (< (:implementationInit %) (:implementationEnd %))))
                      (mapcat #(range (:implementationInit %) (inc (:implementationEnd %))))
                      frequencies
                      sort
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-actives res)
         (->>to-js no-convert? res))))))

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
    (->to-js (filter #(pos? (:RecordCount %)) d4) false)))

(defn generate-exports []
  #js {:reports reports
       :thematicFocus thematic-focus
       :types types
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

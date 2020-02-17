(ns server.main
  (:require [clojure.set :as set]
            [server.utils :refer [rename-ks extract-rec to-grid extract-vals
                                  to-clj ->>to-js ->to-js current-year elapsed
                                  parse-int count!]]
             [cljs.reader :as reader]
             [goog.object :as gobj]
             [goog.string :as gstring]
             [goog.array :as garray]
             [goog.string.format]
             [clojure.string :as str])
  #_(:require-macros [server.example :as eg]))

;;(eg/time* 1)

(defn >js [x]
  (reader/read-string (gstring/format "#js %s" x)))

(def value-a 4)

(defonce value-b 4)

(defn reload! []
  (println "Code updated.")
  (println "Trying values:" value-a value-b))

(defn main! []
  (println "App loaded!"))

(def at-thematic-focuses )

(def at-reports-clj nil)

(def at-reports nil)

(def at-filters nil)

(def at-raw-reports nil)

(def at-countries (atom nil))

(def at-types (atom nil))

(def at-sectors (atom nil))

(def at-regions (atom nil))

(def geo-regions-at (atom nil))

(def at-approvals (atom nil))

(def at-actives (atom nil))

(def at-count-countries (atom nil))

(def at-count-regions (atom nil))

(def at-count-sectors (atom nil))

(def at-count-types (atom nil))

(def at-count-thematic-focus (atom nil))

(comment
  (reset! at-reports (time
                      (do
                        (elapsed "yay to-js")
                        (clj->js res)))))

(defn search [qq]
  (time
   (do
     (elapsed "search")
     (clj->js (map :id (filter (fn [r]
                                (let [rjs (clj->js r)]
                                  (reduce (fn [b q] (if b
                                                      (q rjs)
                                                      false)) true qq))) at-reports-clj))))))

(defn js-reports [ids]
  (time
   (do
     (elapsed "js-reports")
     (let [s-ids (set ids)]
       (clj->js (filter (fn [r] (contains? s-ids (:id r))) at-reports-clj))))))


(def at-reports-countries-clj )

(defn reports []
  (time
   (do
     (elapsed "reports-clj")
     (if (and at-raw-reports at-reports-clj)
       at-reports-clj
       (if-not at-raw-reports
         (->to-js [] false)
         (do
           (let [dict (to-clj at-thematic-focuses)
                 geo-regions-set (set (map :value @geo-regions-at))
                dict (reduce #(assoc % (:id %2) (keyword (:kw %2))) {} dict)
                res (->> at-raw-reports 
                         (map (fn [r]
                                (let [r-tm (reduce (fn [rep id]
                                                     (let [kw (get dict id "NULL")]
                                                       (assoc rep kw true)))
                                                   r
                                                   (:thematicFocus r))]
                                  (-> r-tm
                                      (dissoc :thematicFocus)
                                      (assoc :region (first (set/intersection geo-regions-set (set (:regions r)))) ))))))]

             (def at-reports-clj res)
            (def at-reports-countries-clj (map :country res))
            nil)))))))

(defn thematic-focus []
  (time
   (do
     (elapsed "thematic-focus")
     (let [res (->> (:thematicFocus at-filters)
                 (map (fn [x] (assoc x :kw ((comp #(str/replace % " " "_") str/lower-case str/trimr :name) x))))
                 (->>to-js false)
                 )]
       (def at-thematic-focuses res)
       res
       ))))

(defn filters-to-atom [data]
  (time
   (do
     (elapsed "filters-to-atom")
     (def at-filters (to-clj data))
     at-filters
     )))

(defn reports-to-atom [data]
  (time
   (do
     (elapsed "raw-reports-to-atom")
     (let [res (doall (map
                 #(hash-map
                   :sectors (vec (gobj/get % "sectorIds"))
                   :regions (vec (gobj/get % "regionIds"))
                   :title (gobj/get % "title")
                   :description (gobj/get % "description")
                   :lastUpdate (gobj/get % "lastUpdate")
                   :implementationPeriod (gobj/get % "implementationPeriod")
                   :type (gobj/get % "typeId")
                   :id  (gobj/get % "id")
                   :year  (gobj/get % "year")
                   :thematicFocus  (vec (gobj/get % "thematicFocus"))
                   :country  (gobj/get % "countryId"))
                 data))]
       (def at-raw-reports res)
       res))))

(defn countries []
  (time
   (do
     (elapsed "countries")
     (if @at-countries
       @at-countries
       (let [filters (:regionGroups at-filters)
             geographical (first (filter #(= "Geographical" (:label %)) filters))
             countries (reduce (fn [c reg]
                                 (apply conj c (map (fn [c] (-> c
                                                                (dissoc :name)
                                                                (dissoc :id)
                                                                (assoc :value (:id c))
                                                                (assoc :label (:name c))
                                                                (assoc :region {:id (:id reg) :label (:name reg)}))) (:countries reg)))
                                 ) [] (:regions geographical))
             countries (sort-by :label countries)]
         (reset! at-countries (->to-js countries false))
         )))))

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

(defn types []
  (time
   (do
     (elapsed "types")
     (if @at-types @at-types
         (let [filters (:types at-filters)]
           (reset! at-types (->to-js (extract-rec filters) false)))))))

(defn sectors []
  (time
   (do
     (elapsed "sectors")          
     (if @at-sectors @at-sectors
         (let [sectors (:sectors at-filters)]
           (reset! at-sectors (->to-js (extract-rec sectors) false)))))))

(defn regions []
  (time
   (do
     (elapsed "regions")          
     (if @at-regions @at-regions
         (let [clj-res (extract-rec
                            (->> (:regionGroups at-filters)
                                 (map #(if-not (:id %)
                                         (assoc %2 :id (str %))
                                         %) (range))
                                 (map #(set/rename-keys % {:name :label :id :value :regions :options}))
                                 (map #(update % :options
                                               (fn [ops]
                                                 (map (fn [x] (-> x
                                                                  ((rename-ks {:name :label :id :value}))
                                                                  (update :options (fn [cops] (map (rename-ks {:name :label :id :value}) cops)))
                                                                  )) ops))))))
               r (->>to-js false clj-res)]
           (reset! geo-regions-at (filter #(= "0" (:parent-value %)) clj-res))
           (reset! at-regions r))))))

(defn count-thematic-focus []
  (time
   (do
     (elapsed "count-thematic-focus")
     (if @at-count-thematic-focus
       @at-count-thematic-focus
       (if-not (or at-reports-clj at-thematic-focuses)
         (->to-js [] false)
         (let [reports at-reports-clj 
               thematic-focus-col (to-clj at-thematic-focuses) 
               counters  (reduce #(assoc % (keyword (:kw %2)) 0) {} thematic-focus-col)]
           (reset! at-count-thematic-focus (->>to-js false
                                                     (reduce (fn [cs r]
                                                               (reduce (fn [c1 c2]
                                                                         (if (c2 r)
                                                                           (update c1 c2 inc)
                                                                           c1)) cs (keys cs)))
                                                             counters reports)))))))))

(defn count-countries [] 
  (time
   (do
     (elapsed "count-countries")
     (if @at-count-countries
       @at-count-countries
       
       (let [ret2 (time (do
                     (elapsed "frequencies-count-countries")                        
                     (frequencies at-reports-countries-clj)))
             o (js/Object.)]
         (time (do
            (elapsed "gobj/add-count-countries")                        
            (doseq [[k v] (seq ret2)]
              (when k (gobj/add o (name k) v)))))
         (reset! at-count-countries o))))))

(defn count-regions []
  (time
   (do
     (elapsed "count-regions")
     (if @at-count-regions @at-count-regions
         (let [reports at-reports-clj
               regions (to-clj @at-regions)
               ret (reduce (fn [c r]
                             (let [report-id (:id r)]
                               (-> c
                                   (update :countries conj (:country r))
                                   (update :regions
                                           (fn [x]
                                             (reduce (fn [c s]
                                                       ((extract-vals regions s report-id) c)) x (:regions r))))

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
               res (update ret2 :regions merge eco)]
           (reset! at-count-regions (->to-js res false)))))))

(defn count-sectors []
  (time
   (do
     (elapsed "count-sectors")
     (if @at-count-sectors @at-count-sectors
         (let [reports at-reports-clj
               sectors (to-clj @at-sectors)
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
           (reset! at-count-sectors (->to-js ret2 false)))))))

(defn count-types []
  (time
   (do
     (elapsed "count-types")
     (if @at-count-types @at-count-types
         (let [reports at-reports-clj
               types (to-clj @at-types)
               ret (reduce (fn [c r]
                             (let [report-id (:id r)]
                               (-> c
                                   (update :types (extract-vals types (:type r) report-id))
                                   )))
                           { :types {}}
                           reports)
               ret2 (-> ret
                        (update :types count!))]
           (reset! at-count-types (->to-js ret2 false)))))))

(defn approval-years []
  (time
   (do
     (elapsed "approval-years")
     (if @at-approvals
       @at-approvals
       (let [res (->> at-reports-clj
                      (filter #(parse-int (:year %)))
                      (map #(update % :year parse-int))
                      (group-by :year)
                      (reduce (fn [c [k vs]]
                                (assoc c k (count vs))) (sorted-map))
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-approvals (->>to-js false res)))))))

(defn active-years []
  (time
   (do
     (elapsed "active-years")
     (if @at-actives
       @at-actives
       (let [res (->> at-reports-clj
                      (map (fn [r]
                             (let [[init end] (str/split (:implementationPeriod r) #"-")]
                               (assoc r :implementationInit (parse-int init) :implementationEnd (or (parse-int end) (current-year))))))
                      (filter #(and (some? (:implementationInit %)) (< (:implementationInit %) (:implementationEnd %))))
                      (mapcat #(range (:implementationInit %) (inc (:implementationEnd %))))
                      frequencies
                      sort
                      (reduce (fn [c [k v]] (conj c {:value (str k) :label (str k) :count v} )) []))]
         (reset! at-actives (->>to-js false res)))))))

(defn generate-exports []
  #js {:reportsToAtom reports-to-atom
       :filtersToAtom filters-to-atom
       :reports reports
       :jsReports js-reports
       :search search
       :thematicFocus thematic-focus
       :types types
       :sectors sectors
       :regions regions
       :countries countries
       :countThematicFocus count-thematic-focus
       :countCountries count-countries
       :countSectors count-sectors
       :countTypes count-types
       :countRegions count-regions
       :approvalYears approval-years
       :activeYears active-years
       :findChildrenRec find-children-rec})

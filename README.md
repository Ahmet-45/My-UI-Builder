<h1 align="center">Canopy</h1>

<p align="center">
  A browser-based UI builder that compiles a visual design into clean, framework-free HTML.<br>
  <em>Görsel bir tasarımı temiz, çerçevesiz HTML'e derleyen tarayıcı tabanlı bir arayüz aracı.</em>
</p>

<p align="center">
  <a href="#english">English</a> · <a href="#türkçe">Türkçe</a>
</p>

<!-- Add a screenshot here once ready: -->
<!-- ![Canopy](./screenshot.png) -->

---

<a name="english"></a>

## English

Canopy is a visual UI builder built from scratch with **React, TypeScript and Zustand**, without any external UI or drag-and-drop libraries. You compose an interface by adding, nesting, styling and rearranging elements on a canvas, then export the result as a complete, standalone HTML page.

The core idea is an **agnostic core**: the entire design lives as a single, serializable JSON tree that knows nothing about how it will be rendered. The canvas, the layer panel and the HTML exporter are just different readers of that one tree.

### Features

- **Interactive canvas** — click to select any element; the inspector and insertion logic follow the selection.
- **Layer panel** — the tree shown as an indented list; selecting in the panel and on the canvas stays in sync through a single source of truth.
- **Drag & drop** — reorder and reparent nodes in both the canvas and the layer panel, with a guard against dropping a container into its own subtree.
- **Seven node types** — container, button, text, input, and h1–h3, each producing correct semantic HTML (`<div>`, `<button>`, `<span>`, `<input />`, `<h1>`…).
- **Property inspector** — width, height, spacing, colors, flexbox layout, typography and text wrapping, with fields filtered by node type.
- **Unit support** — `px`, `%`, `vw`, `vh` for width and height, so designs adapt to the screen instead of breaking at a fixed size.
- **Export** — download or copy the design as a full HTML document.
- **Named saves** — store multiple designs in the browser and reload them by name.

### Architecture

The project is organized around a few deliberate decisions:

- **Agnostic core.** The design is a pure `UINode` tree. Because it contains no functions or DOM references, it can be serialized with `JSON.stringify` — which is what makes saving, loading and export nearly free.
- **`NODE_REGISTRY` as a single source of truth.** Each node type declares its HTML tag, whether it accepts children, whether it is self-closing, and its default props in one place. Tree operations, drag-and-drop and export all read from the registry, so behavior stays consistent.
- **Immutable tree with structural sharing.** Every tree transform (`insertNode`, `updateNodeProps`, `moveNode`, …) returns the same reference for untouched branches, so React re-renders only the path that actually changed.
- **Separation of concerns.** State lives in a Zustand store; components declare *what* should happen and the store decides *how*. The canvas edits the tree, the exporter reads it — they never share editor artifacts.

### Tech stack

React · TypeScript · Zustand · Vite — no external UI, styling or drag-and-drop libraries.

### Getting started

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```

### Project structure

```
src/
  components/
    canvas/      # RenderNode, CanvasPanel — the editable surface
    panel/       # LeftPanel, LayerPanel, InspectorPanel, dialogs
    ui/          # reusable widgets (UnitSelect, HeadingMenu)
  store/         # Zustand store (tree, selection, actions)
  types/         # UINode, NodeProps, NODE_REGISTRY
  utils/         # tree helpers, style parser, HTML exporter
```

### Extending it

Adding a new node type is mostly a matter of one entry in `NODE_REGISTRY` plus a branch in `RenderNode`. Because tree operations, drag-and-drop and export all read from the registry, they support the new type without changes.

---

<a name="türkçe"></a>

## Türkçe

Canopy, **React, TypeScript ve Zustand** ile sıfırdan yazılmış; harici hiçbir arayüz veya sürükle-bırak kütüphanesi kullanmayan görsel bir arayüz tasarım aracıdır. Bir tuval üzerinde eleman ekleyip iç içe yerleştirerek, stillendirerek ve yeniden düzenleyerek arayüz oluşturur, sonucu eksiksiz ve bağımsız bir HTML sayfası olarak dışa aktarırsınız.

Temel fikir bir **agnostic core**'dur: tüm tasarım, nasıl render edileceğini bilmeyen tek bir serileştirilebilir JSON ağacı olarak yaşar. Tuval, katman paneli ve HTML dışa aktarıcı, bu tek ağacın farklı okuyucularından ibarettir.

### Özellikler

- **Etkileşimli tuval** — herhangi bir elemana tıklayarak seçin; inspector ve ekleme mantığı seçimi takip eder.
- **Katman paneli** — ağaç, girintili bir liste olarak gösterilir; panelde ve tuvalde yapılan seçim tek doğruluk kaynağı üzerinden senkron kalır.
- **Sürükle & bırak** — düğümleri hem tuvalde hem panelde taşıyıp yeniden konumlandırın; bir container'ı kendi alt ağacına bırakma engellenir.
- **Yedi düğüm tipi** — container, button, text, input ve h1–h3; her biri doğru anlamsal HTML üretir (`<div>`, `<button>`, `<span>`, `<input />`, `<h1>`…).
- **Özellik inspector'ı** — genişlik, yükseklik, boşluk, renkler, flexbox düzeni, tipografi ve metin sarma; alanlar düğüm tipine göre filtrelenir.
- **Birim desteği** — genişlik ve yükseklik için `px`, `%`, `vw`, `vh`; böylece tasarımlar sabit boyutta bozulmak yerine ekrana uyum sağlar.
- **Dışa aktarma** — tasarımı eksiksiz bir HTML belgesi olarak indirin veya kopyalayın.
- **İsimli kayıtlar** — tarayıcıda birden fazla tasarımı saklayıp isimle geri yükleyin.

### Mimari

Proje birkaç bilinçli karar etrafında kurulmuştur:

- **Agnostic core.** Tasarım saf bir `UINode` ağacıdır. İçinde fonksiyon veya DOM referansı barındırmadığı için `JSON.stringify` ile serileştirilebilir — kaydetme, yükleme ve dışa aktarmayı neredeyse bedava kılan şey budur.
- **Tek doğruluk kaynağı olarak `NODE_REGISTRY`.** Her düğüm tipi; HTML etiketini, çocuk kabul edip etmediğini, kendi kendine kapanıp kapanmadığını ve varsayılan özelliklerini tek bir yerde tanımlar. Ağaç işlemleri, sürükle-bırak ve dışa aktarma hep registry'den okuduğu için davranış tutarlı kalır.
- **Yapısal paylaşımlı değişmez ağaç.** Her ağaç dönüşümü (`insertNode`, `updateNodeProps`, `moveNode`, …) dokunulmayan dallar için aynı referansı döndürür; böylece React yalnızca gerçekten değişen yolu yeniden render eder.
- **Sorumlulukların ayrılığı.** State bir Zustand store'unda yaşar; bileşenler *ne olacağını* bildirir, store *nasıl* olacağına karar verir. Tuval ağacı düzenler, dışa aktarıcı onu okur — editör artefaktlarını asla paylaşmazlar.

### Teknolojiler

React · TypeScript · Zustand · Vite — harici arayüz, stil veya sürükle-bırak kütüphanesi yok.

### Başlangıç

Node.js 20.19+ veya 22.12+ gerektirir.

```bash
npm install
npm run dev      # geliştirme sunucusunu başlat
npm run build    # üretim derlemesi
npm run preview  # üretim derlemesini önizle
```

### Proje yapısı

```
src/
  components/
    canvas/      # RenderNode, CanvasPanel — düzenlenebilir yüzey
    panel/       # LeftPanel, LayerPanel, InspectorPanel, diyaloglar
    ui/          # yeniden kullanılabilir bileşenler (UnitSelect, HeadingMenu)
  store/         # Zustand store (ağaç, seçim, action'lar)
  types/         # UINode, NodeProps, NODE_REGISTRY
  utils/         # ağaç yardımcıları, stil ayrıştırıcı, HTML dışa aktarıcı
```

### Genişletme

Yeni bir düğüm tipi eklemek çoğunlukla `NODE_REGISTRY`'ye bir girdi ve `RenderNode`'a bir dal eklemekten ibarettir. Ağaç işlemleri, sürükle-bırak ve dışa aktarma hep registry'den okuduğu için, yeni tipi değişiklik gerektirmeden desteklerler.

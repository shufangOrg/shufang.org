# Virtual Study Room Feature - Visual Examples

## HTML Structure Example

When a reader has a room theme configured, their page is rendered with this structure:

```html
<!-- Outer container with background image -->
<div class="reader-room-background" 
     style="background-image: url('/images/rooms/classic.svg')">
  
  <!-- Semi-transparent overlay for content readability -->
  <div class="room-overlay"></div>
  
  <!-- Content card floating over the background -->
  <article class="reader-room-content">
    <header>
      <h1>西子・与书房的故事</h1>
    </header>
    
    <div class="content">
      <!-- Reader's bio and content -->
      <p>待更新……</p>
      
      <!-- Dynamically listed works -->
      <h2>朗读作品</h2>
      <ul>
        <li><a href="/ja.html">简・爱</a></li>
      </ul>
    </div>
  </article>
</div>
```

## CSS Styling

The room themes use these key CSS properties:

### Background Container
```css
.reader-room-background {
  position: relative;
  min-height: 100vh;              /* Full viewport height */
  background-size: cover;          /* Fill entire area */
  background-position: center;     /* Center the image */
  background-repeat: no-repeat;    /* No tiling */
  background-attachment: fixed;    /* Parallax effect on desktop */
  padding: 2rem 0;
  transition: background-image 0.5s ease-in-out;
}
```

### Overlay for Readability
```css
.room-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(255,255,255,0.75) 0%,
    rgba(255,255,255,0.85) 50%,
    rgba(255,255,255,0.9) 100%
  );
  z-index: 0;
}
```

### Content Card
```css
.reader-room-content {
  position: relative;
  z-index: 1;                           /* Above overlay */
  background-color: rgba(255,255,255,0.95);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem auto;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  animation: fadeInContent 0.8s ease-in-out;
}
```

### Fade-in Animation
```css
@keyframes fadeInContent {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## Room Theme Demonstrations

### Example 1: Classic Theme (xizi)
**File:** `/xizi.html`
**Theme:** `classic`
**Background:** `/images/rooms/classic.svg`

Visual elements:
- Large wooden bookshelves on both sides
- Ornate desk in center
- Classic chandelier
- Warm brown tones
- Traditional study atmosphere

### Example 2: Vintage Theme (olive)
**File:** `/olive.html`
**Theme:** `vintage`
**Background:** `/images/rooms/vintage.svg`

Visual elements:
- Patterned wallpaper
- Vintage typewriter on antique desk
- Old radio on shelf
- Ornate bookshelf with decorative top
- Vintage armchair
- Warm sepia color scheme

### Example 3: Nature Theme (daxia)
**File:** `/daxia.html`
**Theme:** `nature`
**Background:** `/images/rooms/nature.svg`

Visual elements:
- Multiple plants (floor plants, hanging plants, desk plants)
- Natural wood furniture
- Large bright windows
- Earth tone color palette
- Organic, peaceful atmosphere

### Example 4: Cozy Theme (zixin)
**File:** `/zixin.html`
**Theme:** `cozy`
**Background:** `/images/rooms/cozy.svg`

Visual elements:
- Reading nook with cushions and pillows
- Warm floor lamp with glow effect
- Tea cup on side table
- Small bookshelf
- Soft, warm colors (peach, cream)
- Curtained windows

### Example 5: Minimalist Theme (wenda)
**File:** `/wenda.html`
**Theme:** `minimalist`
**Background:** `/images/rooms/minimalist.svg`

Visual elements:
- Ultra-clean design
- Simple desk and chair
- Single shelf with minimal books
- Large windows
- Monochrome palette (white, gray)
- Maximum negative space

### Example 6: Modern Theme (xiaxiaomai)
**File:** `/xiaxiaomai.html`
**Theme:** `modern`
**Background:** `/images/rooms/modern.svg`

Visual elements:
- Clean lines and simple shapes
- Modern minimalist desk
- Contemporary chair
- Large windows
- Neutral color scheme
- Organized bookshelf

## Responsive Design

On mobile devices (screen width < 60em):
- Background attachment changes from `fixed` to `scroll`
- Padding reduces to `1rem`
- Margins adjust for smaller screens
- Content remains readable with overlay

## User Experience Flow

1. **Page Load** → Background image loads (SVG for fast loading)
2. **Fade In** → Content card fades in over 0.8 seconds
3. **Reading** → User reads content in floating card
4. **Scroll** → Background remains fixed (desktop) or scrolls (mobile)
5. **Navigation** → Clicking links to books/episodes maintains theme context

## Integration with Existing Features

The room theme background integrates seamlessly with:
- ✅ Reader biography content
- ✅ List of books read by the reader
- ✅ List of podcast episodes
- ✅ Blog posts
- ✅ Social media links
- ✅ Navigation menu
- ✅ Site header and footer

## Performance

- **SVG files**: Small file size (2-4 KB each)
- **CSS**: Minified and included in main stylesheet
- **No JavaScript**: Pure CSS implementation
- **Fast rendering**: No layout shifts or reflows
- **Cached**: Browser can cache room theme images

## Accessibility

- Content remains fully readable with overlay
- High contrast maintained
- Text selection works normally
- Screen readers focus on content, not decorative background
- Keyboard navigation unaffected

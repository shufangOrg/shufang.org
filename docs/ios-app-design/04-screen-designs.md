# Screen Designs - 一个人的书房 iOS App

This document provides detailed wireframes and specifications for each screen in the app.

---

## Navigation Structure

```
Tab Bar Navigation (主导航)
│
├── 首页 (Home)
│   ├── Episode Detail
│   │   └── Full Player
│   ├── Book Detail
│   │   └── Episode List
│   └── Reader Profile
│       └── Reader's Episodes
│
├── 书目 (Library)
│   ├── All Books Grid
│   ├── Book Detail
│   │   └── Episodes from Book
│   └── Filter/Sort Options
│
├── 朗读者 (Readers)
│   ├── All Readers List
│   └── Reader Profile
│       └── Reader's Books & Episodes
│
└── 我的 (Profile)
    ├── Downloaded Episodes
    ├── Listening History
    ├── Favorites
    ├── Settings
    │   ├── Playback Settings
    │   ├── Download Settings
    │   ├── Notification Settings
    │   └── Appearance Settings
    ├── Support/Donation
    └── About
```

---

## Screen Specifications

## 1. Home Screen (首页)

### Layout
```
┌─────────────────────────────────────┐
│ 一个人的书房                    [搜索]│  ← Navigation Bar
├─────────────────────────────────────┤
│                                     │
│   ┌───────────────────────────┐    │
│   │                           │    │
│   │   Featured Carousel       │    │  ← Featured Content
│   │   (Auto-scrolling)        │    │
│   │                           │    │
│   └───────────────────────────┘    │
│   ● ○ ○ ○ ○ (Page Indicators)     │
│                                     │
│   继续收听 Continue Listening  [更多]│
│   ┌──┬──┬──┬──┐                   │
│   │ 1│ 2│ 3│ 4│ (Horizontal scroll)│  ← Resume
│   └──┴──┴──┴──┘                   │
│                                     │
│   最新节目 Latest Episodes          │
│   ┌─────────────────────────────┐  │
│   │ [Cover] Episode 1          │  │
│   │  80x80  Title, Book, Reader│  │
│   │         Duration, Date  [▶]│  │
│   ├─────────────────────────────┤  │  ← Recent Episodes
│   │ [Cover] Episode 2          │  │
│   │  80x80  ...                │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Episode 3          │  │
│   │  ...                        │  │
│   └─────────────────────────────┘  │
│                                     │
│   播客系列 Podcast Series            │
│   ┌──┬──┬──┬──┐                   │
│   │主│作│声│..│ (Horizontal scroll)│  ← Series Tabs
│   │播│家│音│  │                    │
│   │  │说│邮│  │                    │
│   └──┴──┴──┴──┘                   │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player if playing]           │  ← Mini Player
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │  ← Tab Bar
└─────────────────────────────────────┘
```

### Components

#### 1.1 Featured Carousel
- **Size**: Full width, 200pt height
- **Content**: 
  - Background: Episode artwork (blurred)
  - Overlay: Semi-transparent gradient
  - Text: Episode title, book name, reader
  - CTA: "立即收听" (Listen Now) button
- **Behavior**:
  - Auto-advance every 5 seconds
  - Manual swipe to navigate
  - Pause auto-advance on interaction
- **Data**: 5-7 curated episodes from editors

#### 1.2 Continue Listening
- **Size**: 120pt height, horizontal scroll
- **Content**: 
  - Small cover (100x100pt)
  - Episode title (truncated)
  - Progress bar
  - Remaining time
- **Behavior**:
  - Tap to resume playback
  - Swipe left to remove
- **Data**: Last 10 played but not completed episodes

#### 1.3 Latest Episodes List
- **Size**: Full width, 96pt per item
- **Content**: 
  - Square thumbnail (80x80pt)
  - Episode title (2 lines max)
  - Book name • Reader name
  - Duration and publish date
  - Quick play button
- **Behavior**:
  - Tap row: Open episode detail
  - Tap play: Start playing immediately
  - Swipe left: Download, Share, Add to Queue
  - Pull to refresh
- **Data**: 20 most recent episodes, paginated

#### 1.4 Podcast Series
- **Size**: Full width, horizontal scroll
- **Content**: Series cards with:
  - Series icon/logo
  - Series name
  - Episode count
- **Behavior**:
  - Tap to filter episodes by series
  - Horizontal scroll to see all series
- **Data**: All active podcast series

### States

#### Loading
- Skeleton screens for carousel and list
- Shimmer animation on placeholders
- No spinner, progressive reveal

#### Empty
- Illustration: Open book
- Message: "欢迎来到一个人的书房" (Welcome)
- Subtitle: "开始探索精彩的有声读物" (Start exploring)

#### Error
- Icon: Connection error
- Message: "无法加载内容" (Cannot load content)
- Button: "重试" (Retry)

---

## 2. Episode Detail Screen (节目详情)

### Layout
```
┌─────────────────────────────────────┐
│ [←]                        [分享][•]│  ← Navigation
├─────────────────────────────────────┤
│                                     │
│         ┌─────────────┐            │
│         │             │            │
│         │   Episode   │            │  ← Large Artwork
│         │   Artwork   │            │
│         │  250x250pt  │            │
│         │             │            │
│         └─────────────┘            │
│                                     │
│   Episode Title (Large)             │  ← Title
│   This is a longer episode title    │
│   that might span multiple lines    │
│                                     │
│   Book: 《书名》                    │  ← Metadata
│   Reader: 朗读者 • 42:30           │
│   Published: 2024-01-15            │
│                                     │
│   ┌──────────────┐  ┌──────────┐  │
│   │   ▶ 播放     │  │  ⬇ 下载  │  │  ← Primary Actions
│   └──────────────┘  └──────────┘  │
│                                     │
│   ── 节目介绍 ─────────────────   │  ← Description
│                                     │
│   Episode description text goes     │
│   here. This is a summary of what   │
│   this episode contains. It can be  │
│   multiple paragraphs...            │
│                                     │
│   ── 相关节目 ─────────────────   │  ← Related
│   ┌─────────────────────────────┐  │
│   │ [Cover] Related Episode 1   │  │
│   │  80x80  ...                 │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Related Episode 2   │  │
│   └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player if different playing] │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

### Components

#### 2.1 Episode Artwork
- **Size**: 250x250pt, centered
- **Style**: 12pt corner radius, subtle shadow
- **Behavior**: Tap to zoom/preview

#### 2.2 Episode Information
- **Title**: Large, bold, 2-3 lines max
- **Metadata**: Book, Reader, Duration, Date
- **Style**: Clear hierarchy, readable

#### 2.3 Action Buttons
- **Play/Resume**: Primary button, full width or 60%
- **Download**: Secondary button, 40% or icon button
- **States**:
  - Not downloaded: "下载" (Download)
  - Downloading: Progress circle + "下载中" (Downloading)
  - Downloaded: Checkmark + "已下载" (Downloaded)

#### 2.4 Description
- **Content**: Full episode description from RSS
- **Style**: Body text, expandable if too long
- **Max**: Show first 5 lines, "展开" (Expand) button

#### 2.5 Related Episodes
- **Content**: Same book or same reader
- **Layout**: Compact list, 3-5 items
- **Behavior**: Tap to navigate to episode

### Actions Menu (•••)
- Share episode
- Add to favorites
- Add to playlist
- Report issue
- View on website

---

## 3. Full Player Screen (播放器)

### Layout
```
┌─────────────────────────────────────┐
│                                  [⌄]│  ← Dismiss
│                                     │
│                                     │
│         ┌─────────────┐            │
│         │             │            │
│         │             │            │
│         │  Artwork    │            │  ← Large Artwork
│         │  300x300pt  │            │
│         │             │            │
│         │             │            │
│         └─────────────┘            │
│                                     │
│   Episode Title (Medium)            │  ← Now Playing Info
│   Book Name                         │
│   Reader Name                       │
│                                     │
│   ─────────────────────────────    │
│   00:15:32          ●          42:30│  ← Progress
│   ─────────────────────────────    │
│                                     │
│        ⏮  ◀◀   ▶️   ▶▶  ⏭        │  ← Playback Controls
│       -15s     Play    +15s         │
│                                     │
│   ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ │
│   │1.0x │ │Sleep│ │Queue│ │Share│ │  ← Secondary Controls
│   └─────┘ └─────┘ └─────┘ └─────┘ │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Volume ──────────●───────────── 🔊 │  ← System Volume
└─────────────────────────────────────┘
```

### Components

#### 3.1 Artwork Display
- **Size**: 300x300pt (max), maintains aspect ratio
- **Style**: 12pt corner radius, shadow
- **Animation**: Crossfade when changing tracks

#### 3.2 Now Playing Info
- **Title**: 20pt, medium weight, 2 lines max
- **Book**: 16pt, regular weight, 1 line
- **Reader**: 16pt, gray, 1 line

#### 3.3 Progress Slider
- **Style**: Custom or system slider
- **Color**: Gold thumb, gray track
- **Labels**: Current time (left), Total time (right)
- **Behavior**: 
  - Drag to seek
  - Shows preview time while dragging
  - Updates every second during playback

#### 3.4 Primary Controls
- **Previous Track**: Jump to previous episode (if queue)
- **Skip Back**: -15 seconds (configurable)
- **Play/Pause**: 64pt diameter, primary action
- **Skip Forward**: +15 seconds (configurable)
- **Next Track**: Jump to next episode (if queue)

#### 3.5 Secondary Controls

**Speed Control**:
- Shows current speed (1.0x)
- Tap to show picker: 0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x
- Persists per episode

**Sleep Timer**:
- Icon: Moon or timer
- Options: 5min, 10min, 15min, 30min, 1hr, End of episode
- Shows countdown when active

**Queue**:
- Icon: List icon
- Opens queue sheet
- Badge: Number of items in queue

**Share**:
- Icon: Share arrow
- Opens system share sheet
- Shares episode link and metadata

### States

#### Playing
- Play button shows pause icon
- Progress bar animates
- Artwork may have subtle animation

#### Paused
- Play button shows play icon
- Progress bar static
- No animations

#### Loading/Buffering
- Progress bar shows buffering indicator
- Play button may show spinner overlay

### Gestures
- Swipe down: Dismiss to mini player
- Swipe left/right: Next/previous track (optional)
- Tap artwork: Toggle controls visibility

---

## 4. Library/Books Screen (书目)

### Layout
```
┌─────────────────────────────────────┐
│ 书目                        [搜索][☰]│  ← Navigation
├─────────────────────────────────────┤
│ [全部]  [主播]  [作家说]  [其他]    │  ← Filter Tabs
├─────────────────────────────────────┤
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Book │  │ Book │  │ Book │     │
│  │Cover │  │Cover │  │Cover │     │
│  │ 1    │  │ 2    │  │ 3    │     │  ← Book Grid
│  └──────┘  └──────┘  └──────┘     │  (2 columns)
│  Title 1    Title 2    Title 3     │
│  12 集      8 集       24 集       │
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Book │  │ Book │  │ Book │     │
│  │ 4    │  │ 5    │  │ 6    │     │
│  └──────┘  └──────┘  └──────┘     │
│  Title 4    Title 5    Title 6     │
│  16 集      20 集      6 集        │
│                                     │
│  (Continues scrolling...)           │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player]                       │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

### Components

#### 4.1 Filter Tabs
- **Options**: 
  - 全部 (All)
  - 主播 (Main Podcast)
  - 作家说 (Writers Speak)
  - 声音邮局 (Audio Post)
  - Individual series
- **Style**: Horizontal scroll, pill-shaped buttons
- **Behavior**: Tap to filter, smooth transition

#### 4.2 Book Grid
- **Layout**: 2 columns on iPhone
- **Spacing**: 16pt between items
- **Item**:
  - Cover: 2:3 aspect ratio (~160x240pt)
  - Title: Below cover, 2 lines max
  - Metadata: Episode count
- **Behavior**: Tap to open book detail

#### 4.3 Sort/Filter Menu (☰)
- **Sort by**:
  - 最新 (Newest)
  - 标题 (Title A-Z)
  - 热门 (Popular)
- **Filter by**:
  - 状态: 连载中, 已完结
  - 时长: <30min, 30-60min, >60min
- **Apply** button to confirm

### States

#### Loading
- Skeleton grid with placeholders

#### Empty
- Icon: Empty bookshelf
- Message: "这个分类还没有书目" (No books in this category)

---

## 5. Book Detail Screen (书籍详情)

### Layout
```
┌─────────────────────────────────────┐
│ [←]                        [分享][•]│  ← Navigation
├─────────────────────────────────────┤
│                                     │
│    ┌──────────────┐                │
│    │              │                │
│    │ Book Cover   │                │  ← Book Cover
│    │  200x280pt   │                │
│    │              │                │
│    └──────────────┘                │
│                                     │
│    Book Title (Large)               │  ← Book Info
│    Author Name                      │
│    24 集 • 总时长 18小时           │
│                                     │
│    ┌──────────────┐ ┌──────────┐  │
│    │  ▶ 播放全部  │ │  ⬇ 全下  │  │  ← Actions
│    └──────────────┘ └──────────┘  │
│                                     │
│    ── 简介 ─────────────────────  │  ← Description
│    Book description and synopsis... │
│    (Expandable)                     │
│                                     │
│    ── 朗读者 ───────────────────  │  ← Reader
│    [Avatar] Reader Name             │
│    Bio or description               │
│                                     │
│    ── 章节 ──────────────────── ▼ │  ← Episodes
│    ┌─────────────────────────────┐ │
│    │ 第1集 Episode Title         │ │
│    │ 42:30                   [▶] │ │
│    ├─────────────────────────────┤ │
│    │ 第2集 Episode Title         │ │
│    │ 38:15                   [▶] │ │
│    └─────────────────────────────┘ │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player]                       │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

### Components

#### 5.1 Book Header
- **Cover**: Centered, large (200x280pt)
- **Title**: Below cover, bold, 2 lines max
- **Author**: Regular weight, 1 line
- **Metadata**: Episode count, total duration

#### 5.2 Action Buttons
- **Play All**: Start from first episode or resume
- **Download All**: Batch download all episodes

#### 5.3 Book Description
- **Content**: Synopsis from metadata
- **Style**: Body text, expandable
- **Max**: 5 lines, then "展开" (Expand)

#### 5.4 Reader Information
- **Avatar**: 60pt circle
- **Name**: Tap to view reader profile
- **Bio**: Brief description

#### 5.5 Episodes List
- **Layout**: Numbered list
- **Content**: Episode number/title, duration, play button
- **Behavior**: 
  - Tap row: Open episode detail
  - Tap play: Start playing
  - Swipe: Download, Share
- **Sort**: Default chronological, option to reverse

---

## 6. Readers Screen (朗读者)

### Layout
```
┌─────────────────────────────────────┐
│ 朗读者                      [搜索]  │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│   ┌─────────────────────────────┐  │
│   │ [Avatar] Reader Name    [▶] │  │
│   │  80x80   12本书 • 85集     │  │
│   ├─────────────────────────────┤  │  ← Reader List
│   │ [Avatar] Reader Name    [▶] │  │
│   │  80x80   8本书 • 56集      │  │
│   ├─────────────────────────────┤  │
│   │ [Avatar] Reader Name    [▶] │  │
│   │  80x80   5本书 • 32集      │  │
│   └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player]                       │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

### Components

#### 6.1 Reader List Item
- **Avatar**: 80pt circle, fallback to initials
- **Name**: Medium weight, 1 line
- **Stats**: Books count, episodes count
- **Behavior**: Tap to open reader profile

---

## 7. Reader Profile Screen (朗读者详情)

### Layout
```
┌─────────────────────────────────────┐
│ [←] 朗读者                          │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│         ┌─────────┐                │
│         │ Avatar  │                │  ← Profile Header
│         │ 120x120 │                │
│         └─────────┘                │
│                                     │
│      Reader Name (Large)            │
│      12本书 • 85集 • 45小时        │
│                                     │
│      Brief biography or description │
│      about the reader...            │
│                                     │
│   ── 朗读书目 ───────────────────  │  ← Books
│   ┌──────┐  ┌──────┐  ┌──────┐    │
│   │ Book │  │ Book │  │ Book │    │
│   │ 1    │  │ 2    │  │ 3    │    │
│   └──────┘  └──────┘  └──────┘    │
│   (Horizontal scroll)               │
│                                     │
│   ── 最新节目 ───────────────────  │  ← Recent Episodes
│   ┌─────────────────────────────┐  │
│   │ [Cover] Episode 1          │  │
│   │  80x80  ...                │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Episode 2          │  │
│   └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player]                       │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

---

## 8. Profile/My Screen (我的)

### Layout
```
┌─────────────────────────────────────┐
│ 我的                        [设置]  │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│   ┌─────────────────────────────┐  │
│   │ [Avatar] User Name          │  │  ← User Profile
│   │          123小时 • 256集    │  │  (if logged in)
│   └─────────────────────────────┘  │
│                                     │
│   收听记录 Listening History   [▶]  │  ← Menu Items
│   ─────────────────────────────    │
│   我的下载 Downloads          [▶]  │
│   ─────────────────────────────    │
│   我的收藏 Favorites          [▶]  │
│   ─────────────────────────────    │
│   播放列表 Playlists          [▶]  │
│   ─────────────────────────────    │
│                                     │
│   ── 其他 ──────────────────────   │
│   支持我们 Support Us         [▶]  │
│   ─────────────────────────────    │
│   意见反馈 Feedback           [▶]  │
│   ─────────────────────────────    │
│   关于书房 About              [▶]  │
│   ─────────────────────────────    │
│                                     │
├─────────────────────────────────────┤
│ [Mini Player]                       │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

### Components

#### 8.1 User Profile Card
- **Avatar**: 80pt circle
- **Name**: Guest or user name
- **Stats**: Listening time, episodes count
- **Behavior**: Tap to edit profile (if logged in) or login

#### 8.2 Menu Sections
- **Personal**: History, Downloads, Favorites, Playlists
- **Other**: Support, Feedback, About

---

## 9. Settings Screen (设置)

### Layout
```
┌─────────────────────────────────────┐
│ [←] 设置                            │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│   播放设置 Playback                 │
│   ─────────────────────────────    │
│   默认播放速度           1.0x   [▶]│
│   ─────────────────────────────    │
│   快进时长              15秒    [▶]│
│   ─────────────────────────────    │
│   快退时长              15秒    [▶]│
│   ─────────────────────────────    │
│   自动播放下一集         [Toggle]  │
│   ─────────────────────────────    │
│                                     │
│   下载设置 Downloads                │
│   ─────────────────────────────    │
│   仅Wi-Fi下载           [Toggle]  │
│   ─────────────────────────────    │
│   下载音质              高      [▶]│
│   ─────────────────────────────    │
│   自动删除已听节目       [Toggle]  │
│   ─────────────────────────────    │
│   存储空间已使用  2.3GB/5.0GB       │
│   [清理缓存]                        │
│   ─────────────────────────────    │
│                                     │
│   通知设置 Notifications            │
│   ─────────────────────────────    │
│   新节目提醒            [Toggle]  │
│   ─────────────────────────────    │
│   下载完成提醒          [Toggle]  │
│   ─────────────────────────────    │
│                                     │
│   外观设置 Appearance               │
│   ─────────────────────────────    │
│   深色模式              自动    [▶]│
│   ─────────────────────────────    │
│   文字大小              [Slider]   │
│   ─────────────────────────────    │
│                                     │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

---

## 10. Search Screen (搜索)

### Layout
```
┌─────────────────────────────────────┐
│ [取消] [Search Bar..........]  [🔍]│  ← Search
├─────────────────────────────────────┤
│                                     │
│   历史搜索 Recent Searches          │  ← Before Search
│   老人与海                    [×]  │
│   简爱                        [×]  │
│   安德烈司机                  [×]  │
│                                     │
│   热门搜索 Trending                 │
│   #1 京都手艺人                    │
│   #2 故道白云                      │
│   #3 俗世奇人                      │
│                                     │
├─────────────────────────────────────┤
│                                     │  ← After Search
│   [节目] [书目] [朗读者]           │  (Scope Tabs)
│                                     │
│   找到 12 个节目                   │
│   ┌─────────────────────────────┐  │
│   │ [Cover] Episode 1          │  │
│   │  80x80  Matching keyword   │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Episode 2          │  │
│   └─────────────────────────────┘  │
│                                     │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

---

## 11. Download Management (下载管理)

### Layout
```
┌─────────────────────────────────────┐
│ [←] 下载管理                  [编辑]│  ← Navigation
├─────────────────────────────────────┤
│                                     │
│   已下载 (12)                      │
│   存储空间: 2.3GB / 5.0GB          │
│   ────────────────────────────     │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ [Cover] Episode 1      [✓] │  │
│   │  80x80  Title              │  │
│   │         45.2 MB            │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Episode 2      [✓] │  │
│   │  80x80  Title              │  │
│   │         38.7 MB            │  │
│   ├─────────────────────────────┤  │
│   │ [Cover] Episode 3          │  │
│   │  80x80  Downloading... 67% │  │  ← In Progress
│   │         [Cancel]           │  │
│   └─────────────────────────────┘  │
│                                     │
│   [全部删除]                        │  ← Bulk Action
│                                     │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

---

## 12. Support/Donation Screen (支持我们)

### Layout
```
┌─────────────────────────────────────┐
│ [←] 支持我们                        │  ← Navigation
├─────────────────────────────────────┤
│                                     │
│    [Logo/Illustration]              │
│                                     │
│    感谢您对「一个人的书房」的支持  │
│                                     │
│    「一个人的书房」是一个由社区支持  │
│    的非营利性项目。您的捐助将帮助我  │
│    们继续为大家提供高质量的有声读物  │
│    内容。                           │
│                                     │
│   ── 捐助方式 ───────────────────  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 💚 微信支付 WeChat Pay     │  │
│   │ [View QR Code]             │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 💙 支付宝 Alipay           │  │
│   │ [View QR Code]             │  │
│   └─────────────────────────────┘  │
│                                     │
│   ┌─────────────────────────────┐  │
│   │ 💛 PayPal (International)  │  │
│   │ [Donate via PayPal]        │  │
│   └─────────────────────────────┘  │
│                                     │
│   ── 其他支持方式 ─────────────   │
│   • 分享给朋友                     │
│   • 在社交媒体推荐                 │
│   • 提供反馈和建议                 │
│                                     │
├─────────────────────────────────────┤
│ [首页] [书目] [朗读者] [我的]      │
└─────────────────────────────────────┘
```

---

## Modal Screens

### Speed Control Modal
```
┌─────────────────────────────────────┐
│   播放速度 Playback Speed           │
│                                     │
│   ○ 0.5x                            │
│   ○ 0.75x                           │
│   ● 1.0x  ← Selected                │
│   ○ 1.25x                           │
│   ○ 1.5x                            │
│   ○ 2.0x                            │
│                                     │
│   [Cancel]               [Confirm] │
└─────────────────────────────────────┘
```

### Sleep Timer Modal
```
┌─────────────────────────────────────┐
│   睡眠定时 Sleep Timer              │
│                                     │
│   ○ 5 分钟                         │
│   ○ 10 分钟                        │
│   ● 15 分钟  ← Selected            │
│   ○ 30 分钟                        │
│   ○ 1 小时                         │
│   ○ 本集结束                       │
│                                     │
│   [Cancel]               [Start]   │
└─────────────────────────────────────┘
```

### Queue Modal
```
┌─────────────────────────────────────┐
│ [⌄] 播放队列 (5)           [清空]  │
│                                     │
│   正在播放 Now Playing              │
│   ┌─────────────────────────────┐  │
│   │ [Cover] Current Episode    │  │
│   │  60x60  Title...           │  │
│   └─────────────────────────────┘  │
│                                     │
│   接下来 Up Next                    │
│   ┌─────────────────────────────┐  │
│   │ ≡ [Cover] Episode 1    [×] │  │  ← Draggable
│   │    60x60  Title...         │  │
│   ├─────────────────────────────┤  │
│   │ ≡ [Cover] Episode 2    [×] │  │
│   │    60x60  Title...         │  │
│   └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## Adaptive Layouts

### iPhone SE (Small)
- Single column layouts
- Compact spacing (reduce by 20%)
- Smaller artwork sizes
- Condensed navigation

### iPhone Pro Max (Large)
- Consider 3-column grid for books
- More whitespace
- Larger artwork
- May show more content per screen

### iPad (Future)
- Split view: List + Detail
- 3-4 column grid
- Sidebar navigation
- Landscape optimization
- Picture-in-Picture player

---

## Accessibility Considerations

### VoiceOver
- All images have meaningful labels
- Buttons have clear action descriptions
- Progress indicators announce state changes
- Complex gestures have button alternatives

### Dynamic Type
- All text uses Dynamic Type
- Layouts adapt to larger text sizes
- Minimum touch targets: 44x44pt
- Test at AX5 (largest) size

### Color Contrast
- Text: 7:1 contrast ratio (AAA)
- UI elements: 4.5:1 minimum
- Test with color blindness simulators
- Don't rely on color alone

---

## Next Steps

1. Create high-fidelity mockups in Figma
2. Build interactive prototype
3. Conduct usability testing
4. Refine based on feedback
5. Prepare design handoff for development

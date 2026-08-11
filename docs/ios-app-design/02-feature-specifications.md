# Feature Specifications - 一个人的书房 iOS App

## Feature Priority Framework

Features are categorized using the MoSCoW method:
- **Must Have**: Critical for v1.0 launch
- **Should Have**: Important but not critical for launch
- **Could Have**: Nice to have if time permits
- **Won't Have**: Explicitly excluded from v1.0

---

## 1. Home Screen & Discovery

### 1.1 Featured Content Carousel (Must Have)
**Description**: Showcase latest episodes and featured books

**User Stories**:
- As a user, I want to see the latest episodes immediately upon opening the app
- As a user, I want to discover new content without searching

**Specifications**:
- Auto-scrolling carousel with 5-7 featured items
- High-quality cover images (16:9 aspect ratio)
- Episode title, book name, and reader name
- Tap to view episode details or start playing
- Manual swipe navigation
- Auto-advance every 5 seconds (pauses when user interacts)

### 1.2 Recent Episodes List (Must Have)
**Description**: Chronological list of recent podcast episodes

**Specifications**:
- Show 20 most recent episodes
- Display: cover image, title, book name, reader, duration, date
- "Load More" button for pagination
- Pull-to-refresh for latest content
- Quick play button on each item
- Long-press for options menu (download, share, etc.)

### 1.3 Browse by Series (Must Have)
**Description**: Filter content by podcast series

**Specifications**:
- Tabs or filter for different series:
  - 主播 (Main Podcast)
  - 作家说 (Writers Speak)
  - 声音邮局 (Audio Post Office)
  - Individual book series (老人与海, 简爱, etc.)
- Series-specific artwork and descriptions
- Episode count per series
- Sort options: newest first, oldest first

### 1.4 Continue Listening (Should Have)
**Description**: Quick access to episodes in progress

**Specifications**:
- Horizontal scrollable list of in-progress episodes
- Shows progress bar and remaining time
- Auto-removes completed episodes
- Limit to 10 most recent

---

## 2. Episode Details & Playback

### 2.1 Episode Detail Screen (Must Have)
**Description**: Full information about an episode

**Specifications**:
- Large cover artwork (square, 300x300pt minimum)
- Episode title and description
- Book information and author
- Reader name with link to reader profile
- Episode duration and publication date
- Play/Pause button (primary action)
- Download button with progress indicator
- Share button (share link to episode)
- Add to playlist button (if playlists implemented)
- Related episodes section

### 2.2 Audio Player (Must Have)
**Description**: Full-featured audio playback

**Core Playback Features**:
- ✅ Play/Pause toggle
- ✅ Skip forward 15 seconds
- ✅ Skip backward 15 seconds
- ✅ Playback speed control (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x)
- ✅ Progress slider with current/total time
- ✅ Background playback support
- ✅ Lock screen controls
- ✅ Control Center integration
- ✅ AirPlay support
- ✅ Sleep timer (5min, 10min, 15min, 30min, 1hr, end of episode)

**Advanced Features**:
- ✅ Resume playback from last position
- ✅ Remember playback speed per episode
- ✅ Bookmark position feature
- ✅ Chapter markers (if available in audio file)

### 2.3 Now Playing Mini Player (Must Have)
**Description**: Persistent mini player at bottom of screen

**Specifications**:
- Always visible when audio is playing
- Shows: cover art (small), title, play/pause button
- Tap to expand to full player
- Swipe down to dismiss full player
- Progress bar indicator

### 2.4 Queue Management (Should Have)
**Description**: Manage upcoming episodes

**Specifications**:
- View current playback queue
- Reorder episodes by drag-and-drop
- Remove episodes from queue
- Add episodes to queue from detail screen
- Auto-queue next episode in series
- Clear queue option

---

## 3. Library & Collections

### 3.1 Downloaded Episodes (Must Have)
**Description**: Manage offline content

**Specifications**:
- Grid or list view of downloaded episodes
- Storage space used indicator
- Download management:
  - Cancel active downloads
  - Delete downloaded files
  - Auto-delete listened episodes (optional)
- Filter by series
- Sort by: date downloaded, date published, title

### 3.2 Listening History (Should Have)
**Description**: Track what user has listened to

**Specifications**:
- Chronological list of listened episodes
- Show completion percentage
- Playback date and time
- Clear history option
- Export history as CSV

### 3.3 Favorites/Bookmarks (Should Have)
**Description**: Save favorite episodes for quick access

**Specifications**:
- Mark episode as favorite (heart icon)
- View all favorites in dedicated tab
- Remove from favorites
- Sort favorites by: date added, title, series

### 3.4 Custom Playlists (Could Have)
**Description**: Create custom episode collections

**Specifications**:
- Create named playlists
- Add/remove episodes
- Reorder episodes
- Play entire playlist
- Share playlist with others (via link)

---

## 4. Browse & Discovery

### 4.1 Books Library (Must Have)
**Description**: Browse all books available on the platform

**Specifications**:
- Grid view with book covers
- Filter by: genre, completion status, reader
- Sort by: title, date added, popularity
- Search books by title or author
- Book detail page:
  - Book cover and title
  - Author information
  - Synopsis
  - List of all episodes from this book
  - Reader information
  - Total duration

### 4.2 Readers Directory (Must Have)
**Description**: Browse content by reader

**Specifications**:
- List of all readers with profile pictures
- Reader detail page:
  - Name and bio
  - Profile picture
  - List of books they've read
  - Total episodes
  - Follow reader option (for notifications)

### 4.3 Search Function (Must Have)
**Description**: Find content quickly

**Specifications**:
- Global search bar
- Search scope: episodes, books, readers
- Search filters: series, date range, duration
- Recent searches
- Search suggestions/autocomplete
- Voice search (Could Have)

### 4.4 Recommendations (Could Have)
**Description**: Personalized content suggestions

**Specifications**:
- Based on listening history
- "More like this" on episode detail pages
- "Listeners also enjoyed" section
- Algorithm based on: genre, reader, completion rate

---

## 5. User Account & Settings

### 5.1 User Profile (Should Have)
**Description**: Manage user account

**Specifications**:
- Display name and avatar (optional)
- Email for account recovery
- Listening statistics:
  - Total hours listened
  - Episodes completed
  - Favorite genre/reader
- Account creation via:
  - Email/password
  - Apple Sign In
  - Guest mode (limited features)

### 5.2 App Settings (Must Have)
**Description**: Configure app behavior

**Categories**:

**Playback Settings**:
- Default playback speed
- Skip forward/backward duration (10s, 15s, 30s)
- Auto-play next episode (toggle)
- Retain playback position on exit (toggle)
- Audio quality preference (low, medium, high)

**Download Settings**:
- Auto-download new episodes from followed series (toggle)
- Download over cellular (toggle)
- Download quality (low, medium, high)
- Auto-delete listened episodes (toggle)
- Maximum storage limit

**Notification Settings**:
- New episode alerts (by series)
- Download completion
- Playback reminders

**Appearance Settings**:
- Dark mode (auto, light, dark)
- Text size adjustment
- Language preference

**Other Settings**:
- Clear cache
- Clear download queue
- Reset playback history
- Privacy settings
- Terms of service
- About the app

### 5.3 Sync & Backup (Could Have)
**Description**: Cross-device synchronization

**Specifications**:
- iCloud sync of:
  - Playback positions
  - Listening history
  - Favorites
  - Playlists
- Account-based sync (requires login)
- Manual sync trigger
- Last sync timestamp

---

## 6. Community & Support

### 6.1 Donation Support (Must Have)
**Description**: Allow users to support the platform

**Specifications**:
- Dedicated "Support Us" section
- Display donation options and methods:
  - WeChat Pay
  - Alipay
  - PayPal (international)
  - Bank transfer
- Show impact of donations
- Thank you message and recognition
- Donation history (for logged-in users)

### 6.2 Share & Social (Must Have)
**Description**: Share episodes with others

**Specifications**:
- Share via:
  - WeChat
  - Weibo
  - Email
  - Copy link
  - System share sheet
- Generate shareable card image with:
  - Episode artwork
  - Title and book name
  - QR code to episode
  - "一个人的书房" branding

### 6.3 Feedback & Contact (Should Have)
**Description**: User communication channel

**Specifications**:
- Contact form within app
- Email to: hi@shufang.org
- Bug report template
- Feature request submission
- FAQ section
- Link to website and social media

### 6.4 About & Credits (Must Have)
**Description**: App information and acknowledgments

**Specifications**:
- App version and build number
- About 一个人的书房
- Contributors and readers list
- Open source licenses
- Privacy policy
- Terms of service

---

## 7. Technical Features

### 7.1 Offline Support (Must Have)
**Specifications**:
- Download episodes for offline playback
- Cache episode metadata and images
- Queue downloads
- Background download support
- Download progress notification

### 7.2 Background Playback (Must Have)
**Specifications**:
- Continue playing when app is backgrounded
- Lock screen controls via MPNowPlayingInfoCenter
- Control Center integration
- Support for Bluetooth headphones/controls
- Handle audio interruptions (calls, alarms, etc.)

### 7.3 Performance Optimization (Must Have)
**Specifications**:
- Lazy loading for lists
- Image caching
- Audio streaming with buffering
- Minimize memory footprint
- Efficient data persistence

### 7.4 Accessibility (Should Have)
**Specifications**:
- VoiceOver support
- Dynamic Type support
- High contrast mode
- Reduce motion option
- Accessibility labels on all UI elements

### 7.5 Analytics (Could Have)
**Specifications**:
- Privacy-respecting analytics
- Track: app opens, episode plays, downloads, shares
- No personal data collection
- Opt-out option available
- Anonymous usage statistics

---

## 8. Content Management

### 8.1 RSS Feed Integration (Must Have)
**Description**: Sync with existing podcast feeds

**Specifications**:
- Automatically fetch updates from RSS feeds
- Support multiple feeds (one per series)
- Parse episode metadata
- Download episode artwork
- Check for updates on app launch
- Background refresh (once per day)

### 8.2 Content Caching (Must Have)
**Description**: Improve performance and offline access

**Specifications**:
- Cache episode metadata for 7 days
- Cache images indefinitely (with size limit)
- Smart cache eviction (LRU)
- Manual cache clearing option
- Cache size limit (configurable, default 500MB)

---

## Feature Implementation Priority

### Phase 1 - MVP (v1.0)
**Timeline: 3-4 months**

Core features for initial launch:
- ✅ Home screen with recent episodes
- ✅ Episode detail and playback
- ✅ Basic search
- ✅ Downloads and offline playback
- ✅ Books and readers browse
- ✅ Basic settings
- ✅ Donation support page

### Phase 2 - Enhancement (v1.1-1.2)
**Timeline: 2-3 months after launch**

- ✅ User accounts and profiles
- ✅ Listening history
- ✅ Favorites/bookmarks
- ✅ Queue management
- ✅ Improved recommendations
- ✅ Enhanced search with filters

### Phase 3 - Advanced (v1.3-1.5)
**Timeline: 3-6 months after Phase 2**

- ✅ Custom playlists
- ✅ iCloud sync
- ✅ Social features
- ✅ Advanced analytics
- ✅ Widget support
- ✅ Siri shortcuts

### Future Considerations
- iPad optimization
- CarPlay integration
- Apple Watch app
- Landscape mode optimization
- Traditional Chinese support
- English localization

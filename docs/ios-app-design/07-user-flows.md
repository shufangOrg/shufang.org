# User Flows - 一个人的书房 iOS App

## Primary User Flows

### Flow 1: First Time User - Onboarding

```
App Launch (First Time)
  ↓
Welcome Screen
  - App logo and name
  - Tagline: "用声音裸泳"
  - Brief introduction
  ↓
[继续 Continue] button
  ↓
Permission Requests
  - Notifications (optional)
  - Cellular data for downloads (optional)
  ↓
Home Screen
  - Show featured content
  - Encourage exploration
```

**Decision Points**:
- Allow notifications? → Yes/No
- Allow cellular downloads? → Yes/No

**Success Criteria**:
- User reaches home screen
- Understands app purpose
- Can start browsing content

---

### Flow 2: Discover and Play Episode

```
Home Screen
  ↓
User browses recent episodes OR featured carousel
  ↓
[Tap on Episode] → Episode Detail Screen
  ↓
View episode information:
  - Cover art
  - Title and description
  - Book name and reader
  - Duration
  ↓
[播放 Play] button
  ↓
Audio starts playing
  ↓
Mini Player appears at bottom
  ↓
Continue browsing OR tap mini player
  ↓
Full Player Screen
  - Large artwork
  - Playback controls
  - Progress slider
  - Additional options (speed, timer, queue, share)
```

**Decision Points**:
- Browse more or listen? → Continue browsing/Open player
- Download for offline? → Download/Stream
- Adjust playback settings? → Speed, sleep timer

**Success Criteria**:
- User finds content easily
- Playback starts within 2 seconds
- Player controls work as expected

---

### Flow 3: Browse Books and Series

```
Home Screen
  ↓
Tap [书目 Library] tab
  ↓
Books Grid View
  - Filter by series (tabs at top)
  - Sort options (menu)
  ↓
[Tap on Book Cover] → Book Detail Screen
  ↓
View book information:
  - Large cover
  - Title, author
  - Synopsis
  - Reader info
  - List of episodes
  ↓
Options:
  A) [播放全部 Play All] → Plays from first episode
  B) [Tap specific episode] → Episode Detail
  C) [全下载 Download All] → Batch download
```

**Decision Points**:
- Which series to browse? → Filter selection
- Play all or specific episode? → Action choice
- Download for offline? → Yes/No

**Success Criteria**:
- Easy navigation between books
- Clear understanding of book content
- Quick access to episodes

---

### Flow 4: Download for Offline Listening

```
On Episode Detail OR Book Detail
  ↓
[下载 Download] button
  ↓
Download starts
  - Progress indicator shows
  - Can continue browsing
  ↓
Notification when complete
  ↓
Episode marked as downloaded
  - Checkmark icon
  - Available offline
  ↓
Access from [我的 Profile] → [下载 Downloads]
  ↓
Downloaded Episodes List
  - Can play without internet
  - Can delete to free space
```

**Decision Points**:
- Download now or later? → Download/Skip
- Use WiFi only? → Settings preference
- Delete after listening? → Settings preference

**Success Criteria**:
- Downloads work in background
- Progress clearly indicated
- Offline playback works seamlessly

---

### Flow 5: Create and Manage Playlist

```
[我的 Profile] tab
  ↓
[播放列表 Playlists]
  ↓
[+ 新建播放列表 Create Playlist]
  ↓
Enter playlist name
  ↓
[Add Episodes to Playlist]
  - Browse and select episodes
  - Add from episode detail (+ button)
  ↓
Playlist created
  ↓
Manage playlist:
  - Reorder episodes (drag & drop)
  - Remove episodes (swipe)
  - Play entire playlist
  - Share playlist (future)
```

**Decision Points**:
- Create new or add to existing? → New/Existing
- Which episodes to add? → Selection
- Play order? → Reorder

**Success Criteria**:
- Easy playlist creation
- Intuitive episode management
- Playlist playback works smoothly

---

### Flow 6: Search for Content

```
Any screen
  ↓
Tap [Search] icon
  ↓
Search Screen
  - Search bar appears
  - Recent searches shown
  - Trending searches shown
  ↓
Type search query
  ↓
Results appear (filtered by):
  - [节目 Episodes]
  - [书目 Books]
  - [朗读者 Readers]
  ↓
[Tap result] → Detail screen
  - Episode → Episode Detail
  - Book → Book Detail
  - Reader → Reader Profile
```

**Decision Points**:
- What to search for? → Episodes/Books/Readers
- Which result to select? → Tap choice

**Success Criteria**:
- Fast search results
- Relevant results shown
- Easy to filter/scope
- Can quickly access content

---

### Flow 7: Browse Readers

```
[朗读者 Readers] tab
  ↓
Readers List
  - All readers with profile pictures
  - Name and stats (books, episodes)
  ↓
[Tap on Reader] → Reader Profile
  ↓
View reader information:
  - Avatar and name
  - Biography
  - Statistics
  - Books they've read (horizontal scroll)
  - Recent episodes (list)
  ↓
Options:
  - [Tap book] → Book Detail
  - [Tap episode] → Episode Detail
  - [Follow reader] (future) → Get notifications
```

**Decision Points**:
- Which reader to explore? → Selection
- View books or episodes? → Navigation

**Success Criteria**:
- Easy reader discovery
- Clear reader information
- Quick access to their content

---

### Flow 8: Adjust Playback Settings

```
While Playing (Full Player Screen)
  ↓
Options:
  
A) Change Speed:
   [1.0x] button → Speed picker
   - Select: 0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x
   - Apply → Playback speed changes
   
B) Set Sleep Timer:
   [Sleep Timer] button → Timer picker
   - Select: 5min, 10min, 15min, 30min, 1hr, End of episode
   - [Start] → Countdown begins
   - Shows remaining time
   
C) View Queue:
   [Queue] button → Queue sheet
   - See upcoming episodes
   - Reorder (drag)
   - Remove (swipe)
   - [Clear] entire queue
   
D) Share:
   [Share] button → System share sheet
   - Share via: WeChat, Weibo, Email, Copy Link
```

**Decision Points**:
- Adjust speed? → Select preferred speed
- Set timer? → Choose duration
- Manage queue? → Add/remove/reorder

**Success Criteria**:
- Settings persist across sessions
- Changes apply immediately
- Intuitive controls

---

### Flow 9: Donate/Support

```
[我的 Profile] tab
  ↓
[支持我们 Support Us]
  ↓
Support Screen
  - Introduction to donation
  - Impact of support
  ↓
Choose payment method:
  A) [WeChat Pay] → QR code shown
  B) [Alipay] → QR code shown
  C) [PayPal] → External link (browser)
  D) [Bank Transfer] → Account details
  ↓
Complete donation (external)
  ↓
(Optional) Return to app
  - Thank you message
```

**Decision Points**:
- Which payment method? → Selection
- How much to donate? → User decides externally

**Success Criteria**:
- Clear donation options
- Easy access to payment methods
- Appreciation shown

---

### Flow 10: Manage Account Settings

```
[我的 Profile] tab
  ↓
[设置 Settings] icon
  ↓
Settings Screen
  
Categories:

A) Playback Settings:
   - Default speed
   - Skip forward/backward duration
   - Auto-play next episode
   
B) Download Settings:
   - WiFi only
   - Download quality
   - Auto-delete listened
   - Storage management
   
C) Notifications:
   - New episodes
   - Download complete
   - Playback reminders
   
D) Appearance:
   - Dark mode (Auto/Light/Dark)
   - Text size slider
   - Language
   
E) Other:
   - Clear cache
   - Privacy policy
   - Terms of service
   - About app
```

**Decision Points**:
- Which settings to change? → Category/Option
- Dark mode preference? → Auto/Light/Dark
- Storage cleanup? → Clear cache

**Success Criteria**:
- Settings are discoverable
- Changes apply immediately
- Clear explanations

---

## Secondary User Flows

### Flow 11: Recover from Error

```
Error Occurs (Network failure, playback error, etc.)
  ↓
Error State Displayed
  - Clear error message
  - Icon indicating error type
  - Suggested action
  ↓
Options:
  A) [重试 Retry] → Attempt operation again
  B) [查看已下载 View Downloads] → Switch to offline content
  C) [联系支持 Contact Support] → Feedback form
  ↓
Error resolved OR user finds alternative
```

**Success Criteria**:
- Clear error communication
- Helpful recovery options
- No data loss

---

### Flow 12: Update Check and Sync

```
App Launch OR Manual Refresh
  ↓
Background Sync Starts
  - Check RSS feeds for updates
  - Download new episode metadata
  - Cache cover images
  ↓
New Episodes Found
  ↓
Notification (if enabled)
  - "3 new episodes available"
  ↓
User taps notification → Home Screen
  - New episodes highlighted
  - Pull-to-refresh shows latest
```

**Success Criteria**:
- Seamless background sync
- Timely notifications
- Latest content visible

---

### Flow 13: Share Episode

```
On Episode Detail or Player Screen
  ↓
[Share] button
  ↓
System Share Sheet Opens
  ↓
Options:
  - WeChat
  - Weibo
  - Email
  - Copy Link
  - More...
  ↓
Select method → Content shared
  - Link to episode on website
  - Episode title and artwork
  - "Listen on 一个人的书房"
```

**Success Criteria**:
- Easy sharing
- Rich preview of content
- Working links

---

### Flow 14: Handle Interruptions

```
Audio Playing
  ↓
Interruption Occurs:
  A) Phone Call:
     - Audio pauses automatically
     - Call ends → Audio resumes
     
  B) Alarm/Timer:
     - Audio ducks volume
     - Alarm ends → Volume restored
     
  C) Another App (Music, etc.):
     - Audio stops
     - Return to app → Resume from same position
     
  D) Headphones Disconnected:
     - Audio pauses
     - Reconnect → Ready to resume
```

**Success Criteria**:
- Graceful handling of interruptions
- Position preserved
- Easy to resume

---

### Flow 15: Clear Storage

```
Settings → Download Settings
  ↓
Storage Information:
  - Used: 2.3 GB / 5.0 GB limit
  - Warning if >80% full
  ↓
Options:
  A) [清理缓存 Clear Cache]
     - Removes: Temporary files, old images
     - Keeps: Downloads, favorites
     
  B) [管理下载 Manage Downloads]
     - View all downloaded episodes
     - Select to delete
     - Bulk delete options
     
  C) [自动清理 Auto-cleanup]
     - Toggle: Delete after listening
     - Configure: Keep for X days
  ↓
Storage freed
  - Confirmation message
  - Updated storage info
```

**Success Criteria**:
- Easy storage management
- Clear what will be deleted
- No accidental deletions

---

## Edge Cases & Error Flows

### No Internet Connection

```
User attempts to stream (no internet)
  ↓
Error: "无法连接到网络" (Cannot connect to network)
  ↓
Suggestions:
  - "查看已下载内容" (View downloaded content)
  - "检查网络设置" (Check network settings)
  ↓
User can:
  - Browse offline content
  - Wait for connection
  - Change to WiFi
```

### Storage Full

```
Download fails due to full storage
  ↓
Error: "存储空间不足" (Insufficient storage)
  ↓
Options:
  - "清理缓存" (Clear cache)
  - "管理下载" (Manage downloads)
  - "取消下载" (Cancel download)
  ↓
User frees space OR cancels
```

### Corrupted Download

```
Play downloaded episode → Playback fails
  ↓
Error: "文件损坏" (File corrupted)
  ↓
Options:
  - "重新下载" (Re-download)
  - "在线播放" (Stream instead)
  - "删除" (Delete)
  ↓
User chooses recovery method
```

---

## Flow Diagrams (Text Representation)

### Main Navigation Flow

```
┌──────────────────────────────────────────────┐
│              App Launch                      │
└──────────────┬───────────────────────────────┘
               │
               ↓
┌──────────────────────────────────────────────┐
│           Tab Bar Navigation                 │
├──────┬───────┬───────┬───────────────────────┤
│      │       │       │                       │
│ 首页 │ 书目  │朗读者 │ 我的                  │
└──┬───┴───┬───┴───┬───┴───┬───────────────────┘
   │       │       │       │
   ↓       ↓       ↓       ↓
  Home   Books  Readers  Profile
   │       │       │       │
   └───────┴───┬───┴───────┘
               │
               ↓
       ┌───────────────┐
       │ Episode Detail│
       └───────┬───────┘
               │
               ↓
       ┌───────────────┐
       │  Full Player  │
       └───────────────┘
```

### Playback State Flow

```
        ┌─────────┐
        │ Stopped │
        └────┬────┘
             │ [Play]
             ↓
        ┌─────────┐
    ┌───│ Playing │───┐
    │   └─────────┘   │
[Pause]           [Complete]
    │                 │
    ↓                 ↓
┌─────────┐       ┌─────────┐
│ Paused  │       │ Stopped │
└────┬────┘       └─────────┘
     │ [Play]
     └──────→ Playing
```

### Download State Flow

```
┌────────────┐
│Not Download│
└─────┬──────┘
      │ [Download]
      ↓
┌────────────┐
│Downloading │ ←──┐
└─────┬──────┘    │
      │           │
   [Cancel]   [Pause/Resume]
      │           │
      ↓           │
┌────────────┐    │
│  Canceled  │    │
└────────────┘    │
      │           │
  [Complete]      │
      ↓           │
┌────────────┐    │
│ Downloaded │────┘
└─────┬──────┘
      │ [Delete]
      ↓
┌────────────┐
│Not Download│
└────────────┘
```

---

## User Journey Maps

### New User Journey

**Day 1**: Discovery
- Opens app for first time
- Browses featured content
- Plays first episode
- Impressed by audio quality

**Day 3**: Exploration
- Returns to app
- Explores different books
- Discovers favorite reader
- Downloads episodes for commute

**Week 1**: Engagement
- Daily listening habit formed
- Uses playback features (speed, timer)
- Shares favorite episode with friend
- Explores more series

**Month 1**: Loyalty
- Active daily user
- Has downloaded content library
- Customized settings to preferences
- Considers donating to support

### Returning User Journey

**Regular Session**:
1. Opens app (2-3 times daily)
2. Checks for new episodes
3. Continues from last position
4. Listens during commute/exercise
5. Manages downloads weekly
6. Shares discoveries occasionally

---

## Optimization Opportunities

### Flow Improvements

1. **Reduce Steps to Play**
   - Quick play from anywhere
   - "Continue Listening" prominent
   - One-tap resume

2. **Smarter Downloads**
   - Auto-download new episodes from favorites
   - WiFi-only default
   - Storage warnings

3. **Better Discovery**
   - Personalized recommendations
   - "More like this" suggestions
   - Trending episodes

4. **Seamless Sync**
   - Background refresh
   - Cross-device continuity (future)
   - Conflict-free merging

---

## Success Metrics

### Flow Completion Rates
- Onboarding completion: >90%
- Episode play initiation: >80%
- Download completion: >95%
- Search to play: >70%

### Time Metrics
- Time to first play: <30 seconds
- Search to result: <2 seconds
- App launch to content: <3 seconds
- Download start: Immediate

### Engagement Metrics
- Sessions per day: 2-3
- Listening time per session: 20-40 minutes
- Return rate (7-day): >60%
- Download usage: >40% offline plays

---

## Next Steps

1. Create interactive prototypes for key flows
2. Conduct usability testing with target users
3. Identify friction points and optimize
4. Measure actual metrics post-launch
5. Iterate based on user feedback

# Technical Architecture - 一个人的书房 iOS App

## Technology Stack

### iOS Development
- **Language**: Swift 5.9+
- **Minimum iOS Version**: iOS 15.0
- **IDE**: Xcode 15.0+
- **Architecture Pattern**: MVVM (Model-View-ViewModel)

### Core Frameworks

#### Apple Frameworks
- **UIKit**: Primary UI framework (with some SwiftUI components)
- **AVFoundation**: Audio playback and media handling
- **MediaPlayer**: Now Playing info and remote controls
- **Core Data**: Local data persistence
- **URLSession**: Network requests and downloads
- **Combine**: Reactive programming for data binding
- **UserNotifications**: Local notifications
- **StoreKit**: (Future) In-app purchases if needed

#### Third-Party Dependencies

**Recommended Libraries**:
- **Kingfisher**: Image downloading and caching
- **Alamofire**: Network layer (optional, URLSession is sufficient)
- **FeedKit**: RSS/XML feed parsing
- **SwiftUI**: For some modern UI components
- **Lottie**: Animations (if needed)

**Package Management**: Swift Package Manager (SPM)

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                 iOS App (Client)                │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │          Presentation Layer               │ │
│  │  (Views, ViewControllers, ViewModels)     │ │
│  └───────────────────────────────────────────┘ │
│                      ↕                          │
│  ┌───────────────────────────────────────────┐ │
│  │          Business Logic Layer             │ │
│  │    (Services, Managers, Use Cases)        │ │
│  └───────────────────────────────────────────┘ │
│                      ↕                          │
│  ┌───────────────────────────────────────────┐ │
│  │           Data Layer                      │ │
│  │  (Repositories, Local DB, Network API)    │ │
│  └───────────────────────────────────────────┘ │
│                      ↕                          │
│  ┌──────────────┐  ┌──────────────┐           │
│  │  Core Data   │  │   Network    │           │
│  │  (SQLite)    │  │   (RSS Feed) │           │
│  └──────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────┘
                       ↕
┌─────────────────────────────────────────────────┐
│              Backend Services                   │
│  • shufang.org (Static Site)                   │
│  • RSS Feeds (podcast.xml, talks.xml, etc.)    │
│  • Media Files (MP3 audio hosted on server)    │
│  • Images (Cover art, avatars)                 │
└─────────────────────────────────────────────────┘
```

### MVVM Architecture Pattern

```
View (UIViewController/SwiftUI View)
  ↓ User Actions
  ↕ Bindings (Combine)
ViewModel
  ↓ Business Logic
  ↕ Data Requests
Model / Services
  ↓ Data Operations
Repository / Data Source
  ↓
Local DB ←→ Network API
```

**Benefits**:
- Separation of concerns
- Testable business logic
- Reactive data binding
- Reusable components

---

## Data Layer Architecture

### Local Database Schema (Core Data)

#### Entities

**Episode**
```swift
class Episode: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var title: String           // Episode title
    @NSManaged var episodeDescription: String? // Description
    @NSManaged var audioURL: URL           // Remote audio URL
    @NSManaged var duration: Double        // Duration in seconds
    @NSManaged var publishDate: Date       // Publication date
    @NSManaged var imageURL: URL?          // Cover art URL
    @NSManaged var fileSize: Int64         // File size in bytes
    
    // Relationships
    @NSManaged var book: Book?             // Parent book
    @NSManaged var reader: Reader?         // Reader
    @NSManaged var series: Series?         // Series
    
    // Local state
    @NSManaged var isDownloaded: Bool      // Download status
    @NSManaged var localFileURL: URL?      // Local file path
    @NSManaged var downloadProgress: Double // 0.0 - 1.0
    @NSManaged var lastPlayedPosition: Double // Playback position
    @NSManaged var isCompleted: Bool       // Finished listening
    @NSManaged var isFavorite: Bool        // User favorite
    @NSManaged var playCount: Int          // Number of plays
    @NSManaged var lastPlayedDate: Date?   // Last played timestamp
}
```

**Book**
```swift
class Book: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var title: String           // Book title
    @NSManaged var author: String          // Author name
    @NSManaged var bookDescription: String? // Synopsis
    @NSManaged var coverURL: URL?          // Cover image URL
    @NSManaged var totalDuration: Double   // Total duration
    @NSManaged var episodeCount: Int       // Number of episodes
    
    // Relationships
    @NSManaged var episodes: Set<Episode>  // Episodes in this book
    @NSManaged var reader: Reader?         // Primary reader
    @NSManaged var series: Series?         // Series
}
```

**Reader**
```swift
class Reader: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var name: String            // Reader name
    @NSManaged var bio: String?            // Biography
    @NSManaged var avatarURL: URL?         // Profile picture URL
    
    // Relationships
    @NSManaged var episodes: Set<Episode>  // Episodes read
    @NSManaged var books: Set<Book>        // Books read
}
```

**Series**
```swift
class Series: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var name: String            // Series name
    @NSManaged var seriesDescription: String? // Description
    @NSManaged var imageURL: URL?          // Series artwork
    @NSManaged var rssURL: URL             // RSS feed URL
    
    // Relationships
    @NSManaged var episodes: Set<Episode>  // Episodes in series
    @NSManaged var books: Set<Book>        // Books in series
}
```

**PlayHistory**
```swift
class PlayHistory: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var playedAt: Date          // Timestamp
    @NSManaged var duration: Double        // How long played
    @NSManaged var completionRate: Double  // Percentage completed
    
    // Relationships
    @NSManaged var episode: Episode        // Episode played
}
```

**Playlist**
```swift
class Playlist: NSManagedObject {
    @NSManaged var id: String              // Unique identifier
    @NSManaged var name: String            // Playlist name
    @NSManaged var createdAt: Date         // Creation timestamp
    @NSManaged var episodeOrder: [String]  // Ordered episode IDs
    
    // Relationships
    @NSManaged var episodes: Set<Episode>  // Episodes in playlist
}
```

### Network Layer

#### RSS Feed Parser

**Feed URLs**:
```
Main Podcast:     https://shufang.org/podcast.xml
Writers Speak:    https://shufang.org/talks.xml
Audio Post:       https://shufang.org/syyj.xml
Individual Books: https://shufang.org/lryh.xml, etc.
```

**FeedParser Service**:
```swift
class FeedParserService {
    func fetchFeed(url: URL) async throws -> [Episode]
    func parseFeed(data: Data) throws -> [Episode]
    func checkForUpdates() async throws -> [Episode] // New episodes
}
```

#### Audio Downloader

```swift
class AudioDownloadService {
    func download(episode: Episode, priority: DownloadPriority)
    func cancelDownload(episode: Episode)
    func pauseDownload(episode: Episode)
    func resumeDownload(episode: Episode)
    func deleteDownload(episode: Episode)
    
    // Background downloads
    func scheduleBackgroundDownloads()
    var downloadProgress: AnyPublisher<DownloadProgress, Never>
}
```

#### Image Cache

```swift
class ImageCacheService {
    func loadImage(url: URL) async -> UIImage?
    func prefetchImages(urls: [URL])
    func clearCache()
    func cacheSize() -> Int64
}
```

---

## Business Logic Layer

### Services

#### AudioPlayerService
```swift
class AudioPlayerService {
    // Playback control
    func play(episode: Episode)
    func pause()
    func stop()
    func seek(to time: TimeInterval)
    func skipForward(seconds: Double)
    func skipBackward(seconds: Double)
    
    // Playback settings
    func setPlaybackRate(_ rate: Float) // 0.5x - 2.0x
    func setSleepTimer(duration: TimeInterval)
    
    // Queue management
    func addToQueue(_ episode: Episode)
    func removeFromQueue(_ episode: Episode)
    func clearQueue()
    var currentQueue: [Episode] { get }
    
    // State publishers
    var playbackState: AnyPublisher<PlaybackState, Never>
    var currentTime: AnyPublisher<TimeInterval, Never>
    var duration: AnyPublisher<TimeInterval, Never>
    var nowPlaying: AnyPublisher<Episode?, Never>
}

enum PlaybackState {
    case playing
    case paused
    case stopped
    case buffering
    case error(Error)
}
```

#### SyncService
```swift
class SyncService {
    // Fetch latest content from RSS feeds
    func syncAll() async throws
    func syncSeries(_ series: Series) async throws
    
    // Background sync
    func scheduleBackgroundSync()
    
    // iCloud sync (future)
    func syncWithiCloud() async throws
    func pushToiCloud() async throws
    func pullFromiCloud() async throws
}
```

#### SearchService
```swift
class SearchService {
    func search(query: String, scope: SearchScope) -> [SearchResult]
    func recentSearches() -> [String]
    func clearRecentSearches()
}

enum SearchScope {
    case all
    case episodes
    case books
    case readers
}

struct SearchResult {
    let type: SearchResultType
    let item: Any // Episode, Book, or Reader
    let relevance: Double
}
```

### Repositories

#### EpisodeRepository
```swift
class EpisodeRepository {
    func getAll() -> [Episode]
    func get(id: String) -> Episode?
    func getRecent(limit: Int) -> [Episode]
    func getByBook(book: Book) -> [Episode]
    func getByReader(reader: Reader) -> [Episode]
    func getBySeries(series: Series) -> [Episode]
    func getDownloaded() -> [Episode]
    func getFavorites() -> [Episode]
    func getInProgress() -> [Episode]
    
    func save(_ episode: Episode)
    func delete(_ episode: Episode)
    func update(_ episode: Episode)
}
```

---

## Key Components

### 1. Audio Playback Engine

**AVPlayer Integration**:
```swift
class AudioPlayer {
    private let player: AVPlayer
    private let audioSession: AVAudioSession
    
    // Configure audio session for background playback
    func setupAudioSession() {
        audioSession.setCategory(.playback, mode: .spokenAudio)
        audioSession.setActive(true)
    }
    
    // MPNowPlayingInfoCenter for lock screen
    func updateNowPlayingInfo(episode: Episode, time: TimeInterval) {
        let info: [String: Any] = [
            MPMediaItemPropertyTitle: episode.title,
            MPMediaItemPropertyArtist: episode.reader?.name ?? "",
            MPMediaItemPropertyAlbumTitle: episode.book?.title ?? "",
            MPMediaItemPropertyPlaybackDuration: episode.duration,
            MPNowPlayingInfoPropertyElapsedPlaybackTime: time,
            MPNowPlayingInfoPropertyPlaybackRate: player.rate,
            MPMediaItemPropertyArtwork: artwork
        ]
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
    }
    
    // Remote command center
    func setupRemoteCommands() {
        let commandCenter = MPRemoteCommandCenter.shared()
        commandCenter.playCommand.addTarget { [weak self] _ in
            self?.play()
            return .success
        }
        commandCenter.pauseCommand.addTarget { [weak self] _ in
            self?.pause()
            return .success
        }
        // More commands...
    }
}
```

### 2. Download Manager

**URLSession Background Configuration**:
```swift
class DownloadManager {
    private lazy var session: URLSession = {
        let config = URLSessionConfiguration.background(
            withIdentifier: "org.shufang.downloads"
        )
        config.isDiscretionary = false
        config.sessionSendsLaunchEvents = true
        return URLSession(
            configuration: config,
            delegate: self,
            delegateQueue: nil
        )
    }()
    
    func download(episode: Episode) {
        let task = session.downloadTask(with: episode.audioURL)
        downloads[episode.id] = task
        task.resume()
    }
    
    // URLSessionDownloadDelegate methods
    func urlSession(
        _ session: URLSession,
        downloadTask: URLSessionDownloadTask,
        didFinishDownloadingTo location: URL
    ) {
        // Move file to permanent location
        // Update Core Data
        // Send notification
    }
    
    func urlSession(
        _ session: URLSession,
        downloadTask: URLSessionDownloadTask,
        didWriteData bytesWritten: Int64,
        totalBytesWritten: Int64,
        totalBytesExpectedToWrite: Int64
    ) {
        // Update progress
        let progress = Double(totalBytesWritten) / Double(totalBytesExpectedToWrite)
        // Publish progress update
    }
}
```

### 3. Cache Manager

**Storage Strategy**:
```swift
class CacheManager {
    // Directory structure
    // - Documents/
    //   - Downloads/         (User-initiated downloads)
    //     - {episodeId}.mp3
    // - Library/Caches/
    //   - Images/            (Cached images)
    //   - StreamCache/       (Streaming buffer)
    
    func downloadDirectory() -> URL
    func imageCacheDirectory() -> URL
    func streamCacheDirectory() -> URL
    
    func clearImageCache()
    func clearStreamCache()
    func getTotalCacheSize() -> Int64
    func cleanUpOldFiles(olderThan days: Int)
}
```

---

## Data Flow Examples

### Example 1: Playing an Episode

```
User taps Play button on Episode
  ↓
ViewController → ViewModel.playEpisode()
  ↓
ViewModel → AudioPlayerService.play(episode)
  ↓
AudioPlayerService checks if downloaded:
  - If downloaded: Load from local file
  - If not: Stream from URL
  ↓
AVPlayer starts playback
  ↓
AudioPlayerService updates:
  - MPNowPlayingInfo
  - Playback state publisher
  - Current time publisher
  ↓
ViewModel receives state updates via Combine
  ↓
View updates UI (progress, play/pause button, etc.)
  ↓
Repository updates Episode.lastPlayedPosition periodically
  ↓
Core Data saves playback position
```

### Example 2: Syncing New Episodes

```
App launches or background sync triggered
  ↓
SyncService.syncAll()
  ↓
For each Series:
  - FeedParserService.fetchFeed(rssURL)
  - Parse XML/RSS to Episode objects
  ↓
Compare with existing episodes in Core Data
  ↓
For new episodes:
  - Create Episode entity
  - Fetch and cache cover image
  - Save to Core Data
  ↓
Post notification "New Episodes Available"
  ↓
ViewModels refresh their data
  ↓
Views update to show new content
```

### Example 3: Downloading for Offline

```
User taps Download button
  ↓
ViewModel → AudioDownloadService.download(episode)
  ↓
DownloadService:
  - Creates URLSessionDownloadTask
  - Stores task reference with episode ID
  - Starts download
  ↓
Progress updates via URLSessionDelegate
  ↓
DownloadService publishes progress updates
  ↓
ViewModel receives progress via Combine
  ↓
View updates progress indicator
  ↓
Download completes:
  - Move file to permanent location
  - Update Episode.isDownloaded = true
  - Update Episode.localFileURL
  - Save to Core Data
  ↓
View shows "Downloaded" state
```

---

## Performance Optimizations

### 1. Lazy Loading
- List views load data in batches (pagination)
- Images loaded on-demand as cells appear
- Prefetch upcoming items

### 2. Memory Management
- Proper cleanup of audio player resources
- Image cache with size limit (500MB default)
- Release large objects when backgrounded

### 3. Network Efficiency
- Batch requests when possible
- Cache RSS feed responses (5-minute TTL)
- Use HTTP caching headers
- Compress images before caching

### 4. Database Optimization
- Proper Core Data fetch request predicates
- Use of NSFetchedResultsController for lists
- Background context for write operations
- Merge conflicts handled properly

---

## Security & Privacy

### Data Protection
- All downloaded files stored with file protection
- Sensitive data encrypted at rest
- Secure keychain for credentials (future)

### Privacy
- No personal data collection without consent
- Analytics opt-in only
- Clear privacy policy
- GDPR compliance ready

### Network Security
- HTTPS only for all connections
- Certificate pinning for API endpoints (if custom backend added)
- No sensitive data in URLs

---

## Testing Strategy

### Unit Tests
- ViewModels business logic
- Service layer functions
- Data parsing and transformation
- Repository CRUD operations

### Integration Tests
- Network layer with mock servers
- Core Data operations
- Audio playback scenarios
- Download manager

### UI Tests
- Critical user flows (play, download, search)
- Navigation between screens
- Error state handling
- Accessibility features

### Manual Testing
- Device testing (SE, 14, 15 Pro Max)
- OS version testing (iOS 15, 16, 17)
- Network conditions (3G, WiFi, offline)
- Interruption scenarios (calls, alarms)

---

## Deployment

### Build Configurations
- **Debug**: Development, verbose logging
- **TestFlight**: Beta testing, analytics enabled
- **Release**: Production, optimized, minimal logging

### App Store
- Bundle ID: `org.shufang.ios`
- Team ID: (From Apple Developer account)
- Certificates: Distribution certificate
- Provisioning profiles: App Store profile

### CI/CD (Future)
- GitHub Actions for automated builds
- Fastlane for deployment automation
- TestFlight for beta distribution
- Automatic version bumping

---

## Monitoring & Analytics

### Crash Reporting
- Crashlytics or alternative
- Crash-free rate target: >99.5%
- Symbolication for stack traces

### Analytics (Privacy-Respecting)
- No third-party analytics by default
- Simple metrics:
  - App opens
  - Episode plays
  - Downloads
  - Search queries (anonymized)
- User opt-in required
- No PII collected

### Performance Monitoring
- App launch time
- Screen load times
- Audio playback reliability
- Network request performance

---

## Future Technical Enhancements

### Phase 2
- SwiftUI migration for new screens
- Widgets (home screen, lock screen)
- Siri shortcuts integration
- CarPlay support

### Phase 3
- Apple Watch app
- macOS Catalyst app
- iPad optimization
- Picture-in-Picture

### Phase 4
- Custom backend API (if needed)
- User accounts with sync
- Social features
- Advanced recommendations (ML)

---

## Development Resources

### Documentation
- Apple Human Interface Guidelines
- Swift API Design Guidelines
- AVFoundation Documentation
- Core Data Programming Guide

### Tools
- Xcode with Swift
- SF Symbols app
- Accessibility Inspector
- Network Link Conditioner

### Community
- Swift Forums
- Stack Overflow
- iOS Dev Slack
- GitHub Issues

---

## Technical Risks & Mitigations

### Risk 1: RSS Feed Changes
**Mitigation**: Flexible parsing, versioning, fallbacks

### Risk 2: Large Downloads
**Mitigation**: Resume capability, chunk downloads, size warnings

### Risk 3: Audio Playback Issues
**Mitigation**: Robust error handling, offline fallback, user feedback

### Risk 4: Storage Limitations
**Mitigation**: Auto-cleanup, user controls, size monitoring

### Risk 5: Background Execution
**Mitigation**: Proper background modes, task completion, testing

---

## Conclusion

This technical architecture provides a solid foundation for building a reliable, performant, and maintainable iOS app for 一个人的书房. The architecture is designed to be scalable and can accommodate future enhancements while maintaining code quality and user experience.

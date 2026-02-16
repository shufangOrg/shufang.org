# API Requirements - 一个人的书房 iOS App

## Overview

The iOS app primarily consumes data from existing RSS feeds hosted on shufang.org. The app uses standard RSS/podcast feed protocols and does not require a custom backend API for the initial release.

---

## Current Data Sources

### 1. RSS/Podcast Feeds

All content is currently distributed via standard RSS 2.0 feeds with podcast extensions.

#### Main Feed URLs

```
Base URL: https://shufang.org/

Feeds:
- Main Podcast:        podcast.xml
- Writers Speak:       talks.xml  
- Audio Post Office:   syyj.xml
- Old Man and the Sea: lryh.xml
- This World's White:  zsjsydb.xml
- Paradise Lost:       sly.xml
- When Nietzsche Wept: dnckq.xml
- Kyoto Craftsmen:     jdsyr.xml
- Old Path White Clouds: gdby.xml
- Peculiar People:     ssqr.xml
- Jane Eyre:          ja.xml
```

#### RSS Feed Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>一个人的书房</title>
    <link>https://shufang.org</link>
    <description>若以书而论...</description>
    <language>zh-cn</language>
    <itunes:author>一个人的书房</itunes:author>
    <itunes:image href="https://shufang.org/images/podcast-art.jpg"/>
    <itunes:category text="Society &amp; Culture">
      <itunes:category text="Personal Journals"/>
    </itunes:category>
    
    <item>
      <title>Episode Title</title>
      <link>https://shufang.org/episode-link.html</link>
      <description>Episode description...</description>
      <pubDate>Mon, 15 Jan 2024 08:00:00 GMT</pubDate>
      <enclosure 
        url="https://example.com/audio.mp3" 
        length="45000000" 
        type="audio/mpeg"/>
      <itunes:duration>42:30</itunes:duration>
      <itunes:author>Reader Name</itunes:author>
      <itunes:image href="https://shufang.org/images/cover.jpg"/>
      <guid>unique-episode-id</guid>
    </item>
    <!-- More items... -->
  </channel>
</rss>
```

### 2. Static Assets

#### Audio Files
- **Format**: MP3
- **Bitrate**: Variable (typically 128-192 kbps)
- **Storage**: CDN or web server
- **Access**: Direct URL from RSS enclosure

#### Images
- **Podcast Artwork**: 1400x1400px (minimum)
- **Episode Covers**: Variable sizes
- **Book Covers**: Variable sizes
- **Format**: JPEG or PNG
- **Access**: Direct URLs from RSS or website

### 3. Website Content

- **Base URL**: https://shufang.org
- **Episode Pages**: /episode-name.html
- **Book Pages**: /books.html
- **Reader Pages**: /readers.html
- **About Page**: /about.html

---

## RSS Feed Parsing Requirements

### Feed Parser Implementation

```swift
struct RSSFeed {
    var title: String
    var description: String
    var imageURL: URL?
    var language: String
    var episodes: [Episode]
}

struct Episode {
    var id: String              // GUID from RSS
    var title: String           // <title>
    var description: String     // <description>
    var audioURL: URL           // <enclosure url>
    var duration: TimeInterval  // <itunes:duration>
    var publishDate: Date       // <pubDate>
    var imageURL: URL?          // <itunes:image>
    var author: String?         // <itunes:author> (Reader)
    var fileSize: Int64         // <enclosure length>
    var link: URL?              // <link> to website
}
```

### Parsing Logic

```swift
class FeedParser {
    func parse(url: URL) async throws -> RSSFeed {
        // 1. Fetch XML data
        let (data, _) = try await URLSession.shared.data(from: url)
        
        // 2. Parse XML using XMLParser or FeedKit
        let parser = XMLParser(data: data)
        
        // 3. Extract channel metadata
        // 4. Extract episodes from <item> elements
        // 5. Parse podcast-specific extensions (iTunes namespace)
        
        return RSSFeed(...)
    }
    
    func extractMetadata(from item: XMLElement) -> Episode {
        // Parse required fields
        let title = item.element("title")?.text
        let audioURL = item.element("enclosure")?.attribute("url")
        let duration = parseDuration(item.element("itunes:duration")?.text)
        
        // Parse optional fields
        let description = item.element("description")?.text
        let imageURL = item.element("itunes:image")?.attribute("href")
        let author = item.element("itunes:author")?.text
        
        return Episode(...)
    }
    
    private func parseDuration(_ durationStr: String?) -> TimeInterval {
        // Format can be:
        // - Seconds: "2500"
        // - HH:MM:SS: "00:42:30"
        // - MM:SS: "42:30"
        
        guard let str = durationStr else { return 0 }
        
        let components = str.split(separator: ":")
        if components.count == 3 {
            // HH:MM:SS
            let hours = Double(components[0]) ?? 0
            let minutes = Double(components[1]) ?? 0
            let seconds = Double(components[2]) ?? 0
            return hours * 3600 + minutes * 60 + seconds
        } else if components.count == 2 {
            // MM:SS
            let minutes = Double(components[0]) ?? 0
            let seconds = Double(components[1]) ?? 0
            return minutes * 60 + seconds
        } else {
            // Seconds only
            return Double(str) ?? 0
        }
    }
}
```

---

## Data Synchronization

### Sync Strategy

```swift
class SyncService {
    // Sync all feeds
    func syncAll() async throws {
        let feedURLs = [
            "https://shufang.org/podcast.xml",
            "https://shufang.org/talks.xml",
            "https://shufang.org/syyj.xml",
            // ... more feeds
        ]
        
        for url in feedURLs {
            try await syncFeed(URL(string: url)!)
        }
    }
    
    // Sync individual feed
    func syncFeed(_ url: URL) async throws {
        let feed = try await FeedParser().parse(url: url)
        
        // Get existing episodes from Core Data
        let existing = episodeRepository.getAll()
        let existingIDs = Set(existing.map { $0.id })
        
        // Find new episodes
        let newEpisodes = feed.episodes.filter { !existingIDs.contains($0.id) }
        
        // Save new episodes
        for episode in newEpisodes {
            episodeRepository.save(episode)
        }
        
        // Update existing episodes (in case of corrections)
        for episode in feed.episodes {
            if existingIDs.contains(episode.id) {
                episodeRepository.update(episode)
            }
        }
        
        // Notify observers
        NotificationCenter.default.post(
            name: .newEpisodesAvailable,
            object: newEpisodes
        )
    }
}
```

### Sync Schedule

```swift
// 1. App Launch: Immediate sync
// 2. Pull-to-Refresh: Manual sync
// 3. Background: Every 6-12 hours (using BGAppRefreshTask)

func scheduleBackgroundSync() {
    let request = BGAppRefreshTaskRequest(identifier: "org.shufang.sync")
    request.earliestBeginDate = Date(timeIntervalSinceNow: 6 * 3600) // 6 hours
    
    try? BGTaskScheduler.shared.submit(request)
}
```

### Caching Strategy

```swift
// Cache feed data for 5 minutes to reduce server load
class FeedCache {
    private var cache: [URL: (feed: RSSFeed, timestamp: Date)] = [:]
    private let cacheLifetime: TimeInterval = 300 // 5 minutes
    
    func get(url: URL) -> RSSFeed? {
        guard let cached = cache[url] else { return nil }
        
        let age = Date().timeIntervalSince(cached.timestamp)
        if age < cacheLifetime {
            return cached.feed
        }
        
        // Expired
        cache[url] = nil
        return nil
    }
    
    func set(url: URL, feed: RSSFeed) {
        cache[url] = (feed, Date())
    }
}
```

---

## Additional Data Needs

### 1. Readers Database (Future Enhancement)

Currently, reader information is embedded in episode metadata. For a better UX, we may want a dedicated readers API.

**Desired Endpoint** (if custom backend built):
```
GET /api/readers
GET /api/readers/{id}
GET /api/readers/{id}/episodes
```

**Response Example**:
```json
{
  "id": "reader-001",
  "name": "安德烈司机",
  "bio": "Biography text...",
  "avatarURL": "https://shufang.org/images/readers/reader-001.jpg",
  "booksRead": ["book-001", "book-002"],
  "episodesRead": ["ep-001", "ep-002"],
  "stats": {
    "totalEpisodes": 85,
    "totalDuration": 162000
  }
}
```

### 2. Books Database (Future Enhancement)

Similar to readers, book information could be structured better.

**Desired Endpoint**:
```
GET /api/books
GET /api/books/{id}
GET /api/books/{id}/episodes
```

**Response Example**:
```json
{
  "id": "book-001",
  "title": "老人与海",
  "author": "海明威",
  "description": "Synopsis...",
  "coverURL": "https://shufang.org/images/books/lryh.jpg",
  "readerId": "reader-001",
  "seriesId": "series-001",
  "episodes": ["ep-001", "ep-002"],
  "stats": {
    "totalEpisodes": 24,
    "totalDuration": 108000,
    "completionStatus": "completed"
  }
}
```

### 3. User Account API (Phase 2)

For user accounts, sync, and social features.

**Endpoints**:
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/user/profile
PUT    /api/user/profile
GET    /api/user/progress
PUT    /api/user/progress
GET    /api/user/favorites
POST   /api/user/favorites
DELETE /api/user/favorites/{episodeId}
```

### 4. Analytics API (Phase 2)

Privacy-respecting analytics.

**Endpoint**:
```
POST /api/analytics/event
```

**Request Example**:
```json
{
  "eventType": "episode_play",
  "episodeId": "ep-001",
  "timestamp": "2024-01-15T10:30:00Z",
  "sessionId": "session-uuid",
  "anonymous": true
}
```

---

## Network Layer Implementation

### Service Architecture

```swift
protocol APIService {
    func fetchFeed(url: URL) async throws -> RSSFeed
    func downloadAudio(url: URL) async throws -> URL
    func fetchImage(url: URL) async throws -> Data
}

class NetworkService: APIService {
    private let session: URLSession
    private let cache = FeedCache()
    
    func fetchFeed(url: URL) async throws -> RSSFeed {
        // Check cache first
        if let cached = cache.get(url: url) {
            return cached
        }
        
        // Fetch from network
        let (data, response) = try await session.data(from: url)
        
        guard let httpResponse = response as? HTTPURLResponse,
              httpResponse.statusCode == 200 else {
            throw NetworkError.invalidResponse
        }
        
        let feed = try FeedParser().parse(data: data)
        
        // Cache result
        cache.set(url: url, feed: feed)
        
        return feed
    }
}
```

### Error Handling

```swift
enum NetworkError: Error {
    case noConnection
    case invalidResponse
    case parseError
    case serverError(Int)
    case timeout
    
    var localizedDescription: String {
        switch self {
        case .noConnection:
            return "无法连接到网络"
        case .invalidResponse:
            return "服务器返回无效响应"
        case .parseError:
            return "数据解析失败"
        case .serverError(let code):
            return "服务器错误 (\(code))"
        case .timeout:
            return "请求超时"
        }
    }
}
```

---

## Data Models

### Core Data Entities

Already defined in Technical Architecture, but key relationships:

```
Series (1) ←→ (Many) Books
Series (1) ←→ (Many) Episodes
Book (1) ←→ (Many) Episodes
Reader (1) ←→ (Many) Episodes
Reader (1) ←→ (Many) Books
Episode (1) ←→ (Many) PlayHistory
```

### JSON Mapping (if custom API added)

```swift
struct EpisodeDTO: Codable {
    let id: String
    let title: String
    let description: String?
    let audioURL: String
    let duration: Double
    let publishDate: String
    let imageURL: String?
    let author: String?
    let fileSize: Int64
    let bookId: String?
    let seriesId: String?
    
    func toCoreData() -> Episode {
        let episode = Episode(context: CoreDataStack.shared.context)
        episode.id = id
        episode.title = title
        episode.episodeDescription = description
        episode.audioURL = URL(string: audioURL)!
        episode.duration = duration
        // ... more mappings
        return episode
    }
}
```

---

## API Requirements Summary

### Phase 1 (v1.0) - MVP
✅ RSS Feed Parsing
- Parse existing podcast feeds
- Extract episodes, metadata, media URLs
- Handle podcast extensions (iTunes namespace)

✅ Static Asset Loading
- Load audio files from URLs
- Cache images efficiently
- Handle large file downloads

✅ No Custom Backend Required
- Use existing RSS infrastructure
- Parse reader/book info from episodes
- Local storage only

### Phase 2 (v1.1-1.2) - Enhanced
📋 Optional Custom API
- Structured readers endpoint
- Structured books endpoint
- Better metadata organization
- Faster search/filtering

📋 Analytics API
- Privacy-respecting event tracking
- Aggregate statistics
- Usage patterns

### Phase 3 (v1.3+) - Advanced
📋 User Accounts API
- Registration/authentication
- Cross-device sync
- Cloud backup
- Social features

📋 Recommendations API
- Personalized suggestions
- Similar content
- Trending episodes
- ML-based recommendations

---

## Backend Considerations (Future)

If a custom backend is built in the future:

### Technology Stack Options
- **Backend**: Node.js (Express) or Go (Gin)
- **Database**: PostgreSQL or MongoDB
- **Storage**: S3 or similar for audio/images
- **CDN**: CloudFront or similar
- **Hosting**: AWS, GCP, or DigitalOcean

### API Design Principles
- RESTful endpoints
- JSON responses
- Pagination for lists
- Proper HTTP status codes
- Authentication via JWT
- Rate limiting
- CORS enabled for web
- Versioned API (v1, v2, etc.)

### Documentation
- OpenAPI/Swagger spec
- Interactive docs
- Code examples
- Changelog

---

## Testing Data Sources

### Development Environment
```
Use local XML files for testing:
- test-podcast.xml (with 10 episodes)
- test-talks.xml (with 5 episodes)
- Mock audio URLs
- Local images
```

### Staging Environment
```
Mirror production feeds:
- Same structure
- Subset of content
- Test audio files
- Testing safe
```

### Production Environment
```
Real feeds from shufang.org:
- All podcast series
- Full episode catalog
- Production audio
- Production images
```

---

## Monitoring & Logging

### Feed Health Checks
- Monitor RSS feed availability
- Track parse errors
- Alert on malformed data
- Log sync failures

### Network Monitoring
- Track response times
- Monitor download speeds
- Detect timeouts
- Log network errors

### Usage Analytics (Privacy-Respecting)
- Popular episodes
- Download patterns
- Search queries (anonymized)
- Feature usage

---

## Future API Enhancements

1. **GraphQL Alternative**: More efficient than REST for mobile
2. **WebSocket**: Real-time updates for new episodes
3. **CDN Integration**: Faster asset delivery
4. **Offline-First Sync**: Better offline support
5. **Progressive Web API**: PWA support

---

## Conclusion

The iOS app can be fully functional using only the existing RSS feeds and static assets. No custom backend API is required for v1.0. Future enhancements may benefit from a structured API, but the RSS-based approach provides a solid foundation with minimal infrastructure requirements.

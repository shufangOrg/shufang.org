# Design System - 一个人的书房 iOS App

## Design Tokens

### Color Palette

#### Primary Colors (Light Mode)

```swift
enum AppColor {
    // Brand Colors
    static let brandDarkGray = UIColor(hex: "2C2C2C")
    static let brandGold = UIColor(hex: "B8860B")
    static let warmWhite = UIColor(hex: "FAFAF8")
    
    // Semantic Colors
    static let primaryText = UIColor(hex: "2C2C2C")
    static let secondaryText = UIColor(hex: "666666")
    static let tertiaryText = UIColor(hex: "999999")
    static let divider = UIColor(hex: "E5E5E5")
    static let background = UIColor(hex: "FAFAF8")
    static let cardBackground = UIColor.white
    
    // Status Colors
    static let success = UIColor(hex: "4A7C59")
    static let error = UIColor(hex: "C84B31")
    static let warning = UIColor(hex: "E5A050")
    static let info = UIColor(hex: "5B7C99")
}
```

#### Dark Mode Colors

```swift
extension AppColor {
    static let darkBackground = UIColor(hex: "1C1C1E")
    static let darkCardBackground = UIColor(hex: "2C2C2E")
    static let darkPrimaryText = UIColor.white
    static let darkSecondaryText = UIColor(hex: "AEAEB2")
    static let darkTertiaryText = UIColor(hex: "8E8E93")
    static let darkDivider = UIColor(hex: "38383A")
    static let darkAccent = UIColor(hex: "E5C77E")
}
```

#### Color Usage Guidelines

| Color | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| Primary Text | #2C2C2C | #FFFFFF | Headlines, titles, body text |
| Secondary Text | #666666 | #AEAEB2 | Subtitles, metadata, labels |
| Tertiary Text | #999999 | #8E8E93 | Captions, timestamps, hints |
| Background | #FAFAF8 | #1C1C1E | Screen backgrounds |
| Card Background | #FFFFFF | #2C2C2E | Cards, containers |
| Divider | #E5E5E5 | #38383A | Separators, borders |
| Accent | #B8860B | #E5C77E | CTAs, highlights, active states |
| Success | #4A7C59 | #5B9F72 | Success messages, downloads complete |
| Error | #C84B31 | #E66B53 | Errors, warnings, destructive actions |

### Typography

#### Font Scale

```swift
enum AppFont {
    // Display (Large titles)
    static let display = UIFont.systemFont(ofSize: 34, weight: .bold)
    static let displaySemibold = UIFont.systemFont(ofSize: 34, weight: .semibold)
    
    // Titles
    static let title1 = UIFont.systemFont(ofSize: 28, weight: .bold)
    static let title2 = UIFont.systemFont(ofSize: 22, weight: .bold)
    static let title3 = UIFont.systemFont(ofSize: 20, weight: .semibold)
    
    // Headlines
    static let headline = UIFont.systemFont(ofSize: 17, weight: .semibold)
    static let subheadline = UIFont.systemFont(ofSize: 15, weight: .semibold)
    
    // Body
    static let body = UIFont.systemFont(ofSize: 17, weight: .regular)
    static let bodyEmphasized = UIFont.systemFont(ofSize: 17, weight: .medium)
    static let callout = UIFont.systemFont(ofSize: 16, weight: .regular)
    
    // Small text
    static let footnote = UIFont.systemFont(ofSize: 13, weight: .regular)
    static let caption1 = UIFont.systemFont(ofSize: 12, weight: .regular)
    static let caption2 = UIFont.systemFont(ofSize: 11, weight: .regular)
}
```

#### Chinese Typography Preferences

```swift
enum ChineseFont {
    // Preferred fonts for Chinese text
    static func preferredFont(for textStyle: UIFont.TextStyle) -> UIFont {
        let descriptor = UIFontDescriptor.preferredFontDescriptor(withTextStyle: textStyle)
        let font = UIFont(descriptor: descriptor, size: 0)
        
        // PingFang SC is optimal for Simplified Chinese
        if let pingfang = UIFont(name: "PingFangSC-Regular", size: font.pointSize) {
            return pingfang
        }
        return font
    }
    
    static let displayChinese = UIFont(name: "PingFangSC-Semibold", size: 34)
    static let titleChinese = UIFont(name: "PingFangSC-Medium", size: 20)
    static let bodyChinese = UIFont(name: "PingFangSC-Regular", size: 16)
}
```

#### Dynamic Type Support

```swift
extension AppFont {
    static func scaledFont(for baseFont: UIFont, textStyle: UIFont.TextStyle) -> UIFont {
        let metrics = UIFontMetrics(forTextStyle: textStyle)
        return metrics.scaledFont(for: baseFont)
    }
}

// Usage
let titleFont = AppFont.scaledFont(for: .title1, textStyle: .title1)
```

### Spacing System

```swift
enum Spacing {
    static let xxxs: CGFloat = 2
    static let xxs: CGFloat = 4
    static let xs: CGFloat = 8
    static let s: CGFloat = 12
    static let m: CGFloat = 16
    static let l: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
    static let xxxl: CGFloat = 64
    
    // Semantic spacing
    static let padding = m           // 16pt
    static let margin = m            // 16pt
    static let gap = s               // 12pt
    static let sectionSpacing = l    // 24pt
}
```

### Layout Grid

```swift
enum Layout {
    static let gridColumns = 12
    static let gridGutter: CGFloat = 16
    static let screenMargin: CGFloat = 16
    static let cardRadius: CGFloat = 12
    static let buttonRadius: CGFloat = 8
    static let imageRadius: CGFloat = 8
    
    // Safe margins
    static func safeMargins(for view: UIView) -> UIEdgeInsets {
        return view.safeAreaInsets
    }
}
```

### Shadows & Elevation

```swift
enum Shadow {
    case level1  // Subtle
    case level2  // Medium
    case level3  // High
    
    var properties: (offset: CGSize, radius: CGFloat, opacity: Float, color: UIColor) {
        switch self {
        case .level1:
            return (CGSize(width: 0, height: 2), 4, 0.08, .black)
        case .level2:
            return (CGSize(width: 0, height: 4), 8, 0.12, .black)
        case .level3:
            return (CGSize(width: 0, height: 8), 16, 0.16, .black)
        }
    }
    
    func apply(to layer: CALayer) {
        let props = properties
        layer.shadowOffset = props.offset
        layer.shadowRadius = props.radius
        layer.shadowOpacity = props.opacity
        layer.shadowColor = props.color.cgColor
    }
}
```

### Corner Radius

```swift
enum CornerRadius {
    static let small: CGFloat = 4
    static let medium: CGFloat = 8
    static let large: CGFloat = 12
    static let extraLarge: CGFloat = 16
    static let round: CGFloat = 999  // Fully rounded
}
```

---

## Component Library

### 1. Buttons

#### Primary Button

```swift
class PrimaryButton: UIButton {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAppearance()
    }
    
    private func setupAppearance() {
        backgroundColor = AppColor.brandGold
        setTitleColor(AppColor.brandDarkGray, for: .normal)
        setTitleColor(AppColor.brandDarkGray.withAlphaComponent(0.6), for: .highlighted)
        setTitleColor(AppColor.brandDarkGray.withAlphaComponent(0.4), for: .disabled)
        
        titleLabel?.font = AppFont.headline
        layer.cornerRadius = CornerRadius.medium
        
        // Minimum touch target
        heightAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true
        
        // Padding
        contentEdgeInsets = UIEdgeInsets(
            top: Spacing.s,
            left: Spacing.m,
            bottom: Spacing.s,
            right: Spacing.m
        )
    }
    
    override var isHighlighted: Bool {
        didSet {
            alpha = isHighlighted ? 0.8 : 1.0
        }
    }
}
```

#### Secondary Button

```swift
class SecondaryButton: UIButton {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAppearance()
    }
    
    private func setupAppearance() {
        backgroundColor = .clear
        setTitleColor(AppColor.brandDarkGray, for: .normal)
        setTitleColor(AppColor.secondaryText, for: .highlighted)
        
        layer.borderWidth = 1
        layer.borderColor = AppColor.divider.cgColor
        layer.cornerRadius = CornerRadius.medium
        
        titleLabel?.font = AppFont.headline
        
        heightAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true
        contentEdgeInsets = UIEdgeInsets(
            top: Spacing.s,
            left: Spacing.m,
            bottom: Spacing.s,
            right: Spacing.m
        )
    }
}
```

#### Icon Button

```swift
class IconButton: UIButton {
    init(icon: UIImage?, tintColor: UIColor = AppColor.brandDarkGray) {
        super.init(frame: .zero)
        setImage(icon?.withRenderingMode(.alwaysTemplate), for: .normal)
        self.tintColor = tintColor
        setupAppearance()
    }
    
    private func setupAppearance() {
        // Ensure minimum touch target
        widthAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true
        heightAnchor.constraint(greaterThanOrEqualToConstant: 44).isActive = true
        
        // Center icon
        imageView?.contentMode = .scaleAspectFit
        contentHorizontalAlignment = .center
        contentVerticalAlignment = .center
    }
}
```

### 2. Cards

#### Content Card

```swift
class ContentCard: UIView {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAppearance()
    }
    
    private func setupAppearance() {
        backgroundColor = AppColor.cardBackground
        layer.cornerRadius = CornerRadius.large
        
        // Shadow
        Shadow.level1.apply(to: layer)
        
        // Dark mode adaptation
        layer.borderWidth = 1
        layer.borderColor = UIColor.separator.cgColor
    }
    
    override func traitCollectionDidChange(_ previousTraitCollection: UITraitCollection?) {
        super.traitCollectionDidChange(previousTraitCollection)
        
        if traitCollection.userInterfaceStyle == .dark {
            backgroundColor = AppColor.darkCardBackground
        } else {
            backgroundColor = AppColor.cardBackground
        }
    }
}
```

### 3. List Items

#### Episode List Item

```swift
class EpisodeListCell: UITableViewCell {
    let coverImageView = UIImageView()
    let titleLabel = UILabel()
    let metadataLabel = UILabel()
    let playButton = IconButton(icon: UIImage(systemName: "play.fill"))
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        setupViews()
    }
    
    private func setupViews() {
        // Cover image
        coverImageView.layer.cornerRadius = CornerRadius.medium
        coverImageView.clipsToBounds = true
        coverImageView.contentMode = .scaleAspectFill
        
        // Title
        titleLabel.font = AppFont.headline
        titleLabel.textColor = AppColor.primaryText
        titleLabel.numberOfLines = 2
        
        // Metadata
        metadataLabel.font = AppFont.footnote
        metadataLabel.textColor = AppColor.secondaryText
        metadataLabel.numberOfLines = 1
        
        // Layout
        contentView.addSubview(coverImageView)
        contentView.addSubview(titleLabel)
        contentView.addSubview(metadataLabel)
        contentView.addSubview(playButton)
        
        // Auto Layout constraints...
    }
    
    func configure(with episode: Episode) {
        titleLabel.text = episode.title
        metadataLabel.text = "\(episode.book?.title ?? "") • \(episode.duration.formatted())"
        // Load image...
    }
}
```

### 4. Form Elements

#### Text Input

```swift
class AppTextField: UITextField {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAppearance()
    }
    
    private func setupAppearance() {
        font = AppFont.body
        textColor = AppColor.primaryText
        backgroundColor = AppColor.background
        
        layer.cornerRadius = CornerRadius.medium
        layer.borderWidth = 1
        layer.borderColor = AppColor.divider.cgColor
        
        // Padding
        leftView = UIView(frame: CGRect(x: 0, y: 0, width: Spacing.s, height: 0))
        leftViewMode = .always
        rightView = UIView(frame: CGRect(x: 0, y: 0, width: Spacing.s, height: 0))
        rightViewMode = .always
        
        // Height
        heightAnchor.constraint(equalToConstant: 44).isActive = true
        
        // Placeholder
        attributedPlaceholder = NSAttributedString(
            string: "",
            attributes: [.foregroundColor: AppColor.tertiaryText]
        )
    }
    
    override func becomeFirstResponder() -> Bool {
        let result = super.becomeFirstResponder()
        layer.borderColor = AppColor.brandGold.cgColor
        return result
    }
    
    override func resignFirstResponder() -> Bool {
        let result = super.resignFirstResponder()
        layer.borderColor = AppColor.divider.cgColor
        return result
    }
}
```

### 5. Player Components

#### Progress Slider

```swift
class ProgressSlider: UISlider {
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupAppearance()
    }
    
    private func setupAppearance() {
        minimumTrackTintColor = AppColor.brandGold
        maximumTrackTintColor = AppColor.divider
        
        // Custom thumb
        let thumbImage = createThumbImage()
        setThumbImage(thumbImage, for: .normal)
        setThumbImage(thumbImage, for: .highlighted)
    }
    
    private func createThumbImage() -> UIImage {
        let size = CGSize(width: 28, height: 28)
        let renderer = UIGraphicsImageRenderer(size: size)
        return renderer.image { context in
            AppColor.brandGold.setFill()
            AppColor.warmWhite.setStroke()
            
            let rect = CGRect(origin: .zero, size: size)
            let path = UIBezierPath(ovalIn: rect.insetBy(dx: 2, dy: 2))
            path.fill()
            path.lineWidth = 2
            path.stroke()
        }
    }
}
```

### 6. Loading States

#### Skeleton View

```swift
class SkeletonView: UIView {
    private let gradientLayer = CAGradientLayer()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupGradient()
    }
    
    private func setupGradient() {
        backgroundColor = AppColor.divider.withAlphaComponent(0.3)
        layer.cornerRadius = CornerRadius.small
        
        gradientLayer.startPoint = CGPoint(x: 0, y: 0.5)
        gradientLayer.endPoint = CGPoint(x: 1, y: 0.5)
        
        let lightColor = UIColor.white.withAlphaComponent(0.8).cgColor
        let darkColor = UIColor.white.withAlphaComponent(0.3).cgColor
        
        gradientLayer.colors = [darkColor, lightColor, darkColor]
        gradientLayer.locations = [0, 0.5, 1]
        
        layer.addSublayer(gradientLayer)
        
        startShimmering()
    }
    
    private func startShimmering() {
        let animation = CABasicAnimation(keyPath: "locations")
        animation.fromValue = [-1.0, -0.5, 0.0]
        animation.toValue = [1.0, 1.5, 2.0]
        animation.duration = 1.5
        animation.repeatCount = .infinity
        gradientLayer.add(animation, forKey: "shimmer")
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        gradientLayer.frame = bounds
    }
}
```

### 7. Empty States

#### Empty State View

```swift
class EmptyStateView: UIView {
    private let imageView = UIImageView()
    private let titleLabel = UILabel()
    private let messageLabel = UILabel()
    private let actionButton = PrimaryButton()
    
    init(image: UIImage?, title: String, message: String, actionTitle: String? = nil) {
        super.init(frame: .zero)
        
        imageView.image = image?.withRenderingMode(.alwaysTemplate)
        imageView.tintColor = AppColor.tertiaryText
        imageView.contentMode = .scaleAspectFit
        
        titleLabel.text = title
        titleLabel.font = AppFont.title3
        titleLabel.textColor = AppColor.primaryText
        titleLabel.textAlignment = .center
        
        messageLabel.text = message
        messageLabel.font = AppFont.body
        messageLabel.textColor = AppColor.secondaryText
        messageLabel.textAlignment = .center
        messageLabel.numberOfLines = 0
        
        if let actionTitle = actionTitle {
            actionButton.setTitle(actionTitle, for: .normal)
            actionButton.isHidden = false
        } else {
            actionButton.isHidden = true
        }
        
        setupLayout()
    }
    
    private func setupLayout() {
        addSubview(imageView)
        addSubview(titleLabel)
        addSubview(messageLabel)
        addSubview(actionButton)
        
        // Auto Layout constraints for centered stack...
    }
}
```

---

## Icons & Images

### System Icons (SF Symbols)

```swift
enum AppIcon {
    // Tab Bar
    static let home = UIImage(systemName: "house.fill")
    static let library = UIImage(systemName: "books.vertical.fill")
    static let readers = UIImage(systemName: "person.2.fill")
    static let profile = UIImage(systemName: "person.crop.circle.fill")
    
    // Playback
    static let play = UIImage(systemName: "play.fill")
    static let pause = UIImage(systemName: "pause.fill")
    static let skipForward = UIImage(systemName: "goforward.15")
    static let skipBackward = UIImage(systemName: "gobackward.15")
    static let next = UIImage(systemName: "forward.fill")
    static let previous = UIImage(systemName: "backward.fill")
    
    // Actions
    static let download = UIImage(systemName: "arrow.down.circle")
    static let downloaded = UIImage(systemName: "checkmark.circle.fill")
    static let share = UIImage(systemName: "square.and.arrow.up")
    static let more = UIImage(systemName: "ellipsis")
    static let favorite = UIImage(systemName: "heart")
    static let favoriteFilled = UIImage(systemName: "heart.fill")
    
    // Navigation
    static let search = UIImage(systemName: "magnifyingglass")
    static let close = UIImage(systemName: "xmark")
    static let back = UIImage(systemName: "chevron.left")
    static let settings = UIImage(systemName: "gearshape.fill")
    
    // Status
    static let checkmark = UIImage(systemName: "checkmark")
    static let error = UIImage(systemName: "exclamationmark.triangle")
    static let warning = UIImage(systemName: "exclamationmark.circle")
    static let info = UIImage(systemName: "info.circle")
}
```

### Image Loading

```swift
extension UIImageView {
    func loadImage(from url: URL, placeholder: UIImage? = nil) {
        image = placeholder
        
        // Using Kingfisher or custom image cache
        ImageCacheService.shared.loadImage(url: url) { [weak self] result in
            switch result {
            case .success(let image):
                self?.image = image
            case .failure:
                self?.image = placeholder
            }
        }
    }
}
```

---

## Animations

### Standard Durations

```swift
enum AnimationDuration {
    static let instant: TimeInterval = 0.1
    static let fast: TimeInterval = 0.2
    static let normal: TimeInterval = 0.3
    static let slow: TimeInterval = 0.5
    static let verySlow: TimeInterval = 0.8
}
```

### Common Animations

```swift
extension UIView {
    func fadeIn(duration: TimeInterval = AnimationDuration.normal) {
        alpha = 0
        UIView.animate(withDuration: duration) {
            self.alpha = 1
        }
    }
    
    func fadeOut(duration: TimeInterval = AnimationDuration.normal, completion: (() -> Void)? = nil) {
        UIView.animate(withDuration: duration, animations: {
            self.alpha = 0
        }, completion: { _ in
            completion?()
        })
    }
    
    func scalePress() {
        UIView.animate(
            withDuration: AnimationDuration.fast,
            delay: 0,
            options: [.allowUserInteraction, .curveEaseOut],
            animations: {
                self.transform = CGAffineTransform(scaleX: 0.96, y: 0.96)
            }
        ) { _ in
            UIView.animate(
                withDuration: AnimationDuration.fast,
                delay: 0,
                options: [.allowUserInteraction, .curveEaseIn],
                animations: {
                    self.transform = .identity
                }
            )
        }
    }
}
```

### Transition Animations

```swift
enum ViewTransition {
    static func crossfade(from oldView: UIView, to newView: UIView, duration: TimeInterval = 0.3) {
        oldView.alpha = 1
        newView.alpha = 0
        
        UIView.animate(withDuration: duration) {
            oldView.alpha = 0
            newView.alpha = 1
        }
    }
    
    static func slideUp(view: UIView, duration: TimeInterval = 0.4) {
        let originalFrame = view.frame
        view.frame.origin.y = UIScreen.main.bounds.height
        
        UIView.animate(
            withDuration: duration,
            delay: 0,
            usingSpringWithDamping: 0.8,
            initialSpringVelocity: 0,
            options: .curveEaseOut,
            animations: {
                view.frame = originalFrame
            }
        )
    }
}
```

---

## Accessibility

### Accessibility Labels

```swift
extension UIView {
    func setupAccessibility(label: String, hint: String? = nil, traits: UIAccessibilityTraits = []) {
        isAccessibilityElement = true
        accessibilityLabel = label
        accessibilityHint = hint
        accessibilityTraits = traits
    }
}

// Usage
playButton.setupAccessibility(
    label: "播放",
    hint: "双击播放当前节目",
    traits: .button
)
```

### Dynamic Type

```swift
extension UILabel {
    func applyDynamicType(textStyle: UIFont.TextStyle, maximumPointSize: CGFloat? = nil) {
        adjustsFontForContentSizeCategory = true
        font = UIFont.preferredFont(forTextStyle: textStyle)
        
        if let maxSize = maximumPointSize {
            font = UIFontMetrics(forTextStyle: textStyle).scaledFont(
                for: font,
                maximumPointSize: maxSize
            )
        }
    }
}
```

---

## Usage Guidelines

### Do's
✅ Use design tokens consistently
✅ Follow spacing system
✅ Maintain visual hierarchy
✅ Test in both light and dark modes
✅ Support Dynamic Type
✅ Use SF Symbols where possible
✅ Apply semantic colors

### Don'ts
❌ Hard-code colors or sizes
❌ Skip accessibility labels
❌ Ignore safe area insets
❌ Use non-standard fonts
❌ Overcomplicate animations
❌ Forget dark mode testing

---

## Design System Checklist

- [ ] All colors use design tokens
- [ ] Typography follows scale
- [ ] Spacing uses 8pt grid
- [ ] Components are reusable
- [ ] Dark mode supported
- [ ] Accessibility implemented
- [ ] Animations are smooth (60fps)
- [ ] Icons are consistent
- [ ] Touch targets ≥ 44pt
- [ ] Tested on multiple devices

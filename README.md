# Flixbus Coupon Saver 🎫

A mobile-first Progressive Web App to store, manage, and organize your coupon codes. Works offline and can be installed on your phone like a native app.

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Quick Start

### Use the App

**Try it now:** [Live Demo](https://avispatech.github.io/flixbus-coupon-saver) *(replace with your URL)*

### Install on Your Phone

1. **Open the app** in your mobile browser
2. **Add to Home Screen**:
   - **iPhone**: Tap Share button → "Add to Home Screen"
   - **Android**: Tap menu (3 dots) → "Add to Home screen" or look for install prompt
3. **Use offline** - works without internet connection

## 📱 How to Use

### Adding Coupons
- Tap the **green + button** in the bottom right
- **Enter codes one per line** in the text area
- Tap **Save** to add them to your current list

### Managing Coupons

#### Current Tab
- **Tap any coupon** → copies to clipboard instantly
- **Swipe any coupon** → moves to archived

#### Archived Tab  
- **Tap any coupon** → copies to clipboard
- **Swipe left** → moves back to current
- **Swipe right** → deletes permanently

### Features
- ✅ **Works offline** - no internet needed after first visit
- ✅ **Persistent storage** - your coupons stay saved
- ✅ **One-tap copy** - instant clipboard access
- ✅ **Touch-friendly** - optimized for mobile use
- ✅ **Clean interface** - easy to read monospace codes

## 🛠️ Technical Overview

### Architecture

This PWA is built with vanilla JavaScript using a modular approach:

### File Structure

```
coupon-manager/
├── index.html      # Main HTML structure
├── app.js          # All JavaScript modules
├── styles.css      # Complete styling
├── manifest.json   # PWA configuration
├── sw.js           # Service worker
├── README.md       # Documentation
└── LICENSE         # MIT license
```

#### Core Modules

**StorageManager** (`app.js`)
- Handles localStorage operations
- Provides get/set methods with error handling

**CouponManager** (`app.js`) 
- Manages coupon CRUD operations
- Handles current/archived state transitions
- Validates and processes bulk input

**UIManager** (`app.js`)
- Controls tab switching and rendering
- Updates DOM with coupon lists
- Handles empty states

**TouchHandler** (`app.js`)
- Detects tap vs swipe gestures
- Differentiates swipe directions
- Provides visual feedback during interactions

**ClipboardManager** (`app.js`)
- Modern clipboard API with fallback
- Shows success notifications

**ModalManager** (`app.js`)
- Controls add coupon modal
- Handles bulk text input processing

**ToastManager** (`app.js`)
- Shows temporary notifications
- Non-blocking user feedback

### PWA Components

**Service Worker** (`sw.js`)
- Caches app resources for offline use
- Implements cache-first strategy
- Handles cache updates

**Web App Manifest** (`manifest.json`)
- Enables "Add to Home Screen"
- Defines app metadata and icons
- Sets standalone display mode

### Data Storage

Uses `localStorage` with JSON serialization:
- `current-coupons`: Array of current coupon objects
- `archived-coupons`: Array of archived coupon objects

Each coupon object: `{ code: "COUPONCODE", id: timestamp }`

### Browser Support

- ✅ Chrome/Chromium (Android, Desktop)
- ✅ Safari (iOS, macOS) 
- ✅ Firefox
- ✅ Edge
- ⚠️ Touch gestures require modern browser

## 🔧 Development

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/coupon-manager.git
   cd coupon-manager
   ```

2. **Start local server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open browser**: `http://localhost:8000`

### Deployment to GitHub Pages

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: main, folder: / (root)
3. **Access**: `https://yourusername.github.io/coupon-manager`

### Testing

**Manual Testing Checklist:**
- [ ] Add coupons via bulk input
- [ ] Copy coupon codes (check clipboard)
- [ ] Swipe gestures on both tabs
- [ ] Tab switching functionality
- [ ] Offline functionality (disconnect network)
- [ ] PWA installation on mobile device

## 🤝 Contributing

We welcome contributions! Here's how to help:

### Ways to Contribute

**🐛 Bug Reports**
- Use GitHub Issues
- Include browser/device info
- Describe steps to reproduce
- Add screenshots if helpful

**💡 Feature Requests** 
- Open GitHub Issue with "enhancement" label
- Describe the use case
- Explain expected behavior

**🛠️ Code Contributions**

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow existing code style
   - Keep modules separate and focused
   - Test on mobile devices

4. **Submit Pull Request**
   - Clear description of changes
   - Reference any related issues
   - Include testing notes

### Development Guidelines

**Code Style:**
- Use ES6+ JavaScript features
- Keep functions small and focused
- Comment complex logic
- Use meaningful variable names

**Mobile-First:**
- Test on actual mobile devices
- Ensure touch gestures work smoothly
- Verify offline functionality
- Check PWA installation flow

**Performance:**
- Minimize DOM manipulations
- Keep localStorage operations efficient
- Test with large numbers of coupons

### Roadmap Ideas

Potential future enhancements:
- [ ] Coupon expiration dates
- [ ] Categories/tags for organization  
- [ ] Search and filter functionality
- [ ] Export/import features
- [ ] Backup to cloud storage
- [ ] Usage tracking/statistics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Inspired by mobile-first design principles
- Uses Web APIs for native-like experience

---

**Made with ❤️ for fellow bus travelers**

*Have questions? [Open an issue](https://github.com/avispatech/flixbus-coupon-saver/issues) or contribute to make this app even better!*

<h1>
  <sub>
    <img src="icon.png" alt="cf fetcher logo" height="38">
  </sub>
  CF Fetcher
</h1>

<a href="https://addons.mozilla.org/en-US/firefox/addon/carrot/"><img src="https://i.imgur.com/WJ9Fhop.png" alt="Mozilla Add-ons" height="48"></a>&emsp;<a href="https://chrome.google.com/webstore/detail/carrot/gakohpXNy2SA"><img src="https://i.imgur.com/iswHnpJ.png" alt="Chrome Web Store" height="48"></a>

A Chrome extension that fetches your Codeforces accepted submissions and generates a beautiful README.md file for your repository.

## 📺 Demo Video
[![CF Fetcher Demo](https://img.youtube.com/vi/BSlqpXNy2SA/0.jpg)](https://www.youtube.com/watch?v=BSlqpXNy2SA)

## ✨ Features

- 🚀 **Easy Setup** - Just enter your Codeforces handle and API credentials
- 📊 **Smart Filtering** - Only fetches your accepted submissions
- 🎯 **Duplicate Removal** - Keeps only the latest submission for each problem
- 📝 **Beautiful README** - Generates a well-formatted markdown table
- 💾 **Auto-Save** - Remembers your credentials for future use
- 🔗 **Direct Links** - Includes links to problems and submissions
- 🏷️ **Problem Tags** - Shows problem difficulty and categories
- 📱 **Popup & Tab** - Works both as popup and in dedicated tab

## 🛠️ Installation

### Chrome Extension
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The CF Fetcher icon will appear in your toolbar

### Firefox Extension
1. Download the extension from Mozilla Add-ons (link above)
2. Or load it manually in `about:debugging`

## 🔧 Setup

### Getting Codeforces API Credentials

1. **Login to Codeforces** - Go to [codeforces.com](https://codeforces.com) and login
2. **API Settings** - Navigate to Settings → API
3. **Generate Keys** - Click "Generate new keys" if you don't have them
4. **Copy Credentials** - Copy your API Key and Secret API Key

### Using the Extension

1. **Click the CF Fetcher icon** in your browser toolbar
2. **Enter your details**:
   - **Handle**: Your Codeforces username
   - **API Key**: Your public API key
   - **Secret API Key**: Your private API key
3. **Generate README** - Click the "Generate" button
4. **Download** - The README.md file will be automatically downloaded

## 📋 Generated README Format

The extension creates a README with the following structure:

```markdown
## Codeforces Submissions

*Auto-generated with ❤️ using [Codeforces Submission Fetcher](https://github.com/Andrew-Velox/codeforces-submission-fetcher)*

## Introduction

A repository to keep track of problem solving practice, containing solutions from platforms:

• **Codeforces**

> Codeforces is a website which hosts competitive programming contests: [http://codeforces.com](http://codeforces.com)

## Contents

| # | Title | Solution | Tags | Submitted |
|:-:|-------|----------|------|-----------|
| 1 | [A - Problem Name](link) | [C++20](submission-link) | `implementation` `*800` | Aug 15 2025, 14:30 |
```

## 🎯 Example Output

| # | Title | Solution | Tags | Submitted |
|:-:|-------|----------|------|-----------|
| 582 | [B - Robot Program](https://codeforces.com/contest/2070/problem/B) | [C++23 (GCC 14-64, msys2)](https://codeforces.com/contest/2070/submission/332250946) | `brute force` `implementation` `math` `*1100` | Aug 03 2025, 22:12 |
| 581 | [B - Perfecto](https://codeforces.com/contest/2071/problem/B) | [C++23 (GCC 14-64, msys2)](https://codeforces.com/contest/2071/submission/332230979) | `brute force` `constructive algorithms` `greedy` `math` `*1100` | Aug 03 2025, 19:42 |

## 🔒 Privacy & Security

- **Local Storage Only** - Your API credentials are stored locally in your browser
- **No External Servers** - All processing happens in your browser
- **Secure API Calls** - Uses official Codeforces API with proper authentication
- **No Data Collection** - We don't collect or store any of your personal data

## 🚀 Features in Detail

### Auto-Save Credentials
- Your handle, API key, and secret key are automatically saved
- No need to re-enter credentials every time
- Stored securely in browser's local storage

### Popup vs Tab Mode
- **Popup Mode**: Quick access from toolbar
- **Tab Mode**: Click "Open in New Tab" for persistent window
- Tab mode prevents data loss when copying credentials

### Smart Submission Processing
- Fetches only accepted submissions (`verdict: "OK"`)
- Removes duplicate submissions (keeps latest for each problem)
- Handles pagination automatically for users with many submissions
- Includes problem ratings and tags

### Error Handling
- Validates handle format (3-24 characters, alphanumeric + underscore)
- Provides clear error messages for API issues
- Automatic fallback for download methods

## 🛠️ Development

### Project Structure
```
├── manifest.json          # Extension manifest
├── index.html             # Popup interface
├── app.js                 # Main application logic
├── background.js          # Background script for downloads
├── style.css              # Styling
├── tailwind.js            # Tailwind CSS
└── icon.png              # Extension icon
```

### Technologies Used
- **Manifest V3** - Latest Chrome extension standard
- **Vanilla JavaScript** - No external frameworks
- **Tailwind CSS** - For styling
- **Chrome APIs** - Storage, Downloads, Runtime

### Building
1. Clone the repository
2. Make your changes
3. Test in Chrome developer mode
4. Package for distribution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Bug Reports

Found a bug? Please create an issue on GitHub with:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser and extension version
- Console errors (if any)

## 💡 Feature Requests

Have an idea for improvement? Open an issue and describe:
- The feature you'd like
- Why it would be useful
- How it should work

## 📞 Support

- **GitHub Issues**: For bugs and feature requests
- **Email**: [your-email@example.com]
- **Demo Video**: [YouTube Tutorial](https://www.youtube.com/watch?v=BSlqpXNy2SA)

## 🏆 Acknowledgments

- Thanks to [Codeforces](https://codeforces.com) for providing the API
- Inspired by competitive programming community
- Built with ❤️ for fellow coders

---

**Happy Coding! 🚀**

*Generate your competitive programming portfolio with CF Fetcher*

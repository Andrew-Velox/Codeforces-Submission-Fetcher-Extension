<h1>
  <sub>
    <img src="images/CF_Fetcher_icn.png" alt="CF Fetcher logo" height="38">
  </sub>
  CF Fetcher
</h1>

<a href="https://chromewebstore.google.com/detail/pehfoogjijedipaehbibmjcajbcbimef?utm_source=item-share-cb"><img src="https://i.imgur.com/iswHnpJ.png" alt="Chrome Web Store" height="48"></a>

A Chrome extension that fetches your Codeforces accepted submissions and generates a ZIP file containing rating-wise README.md files. You can easily upload these to your GitHub repository to track and showcase your problem-solving achievements.

---

## Features

- **Auto README Generation**: Creates markdown tables with your accepted submissions
- **Rating-wise Filtering**: Submissions are grouped by problem rating, each with its own README.md
- **Smart Filtering**: Only includes your latest accepted solution for each problem
- **Problem Details**: Shows difficulty ratings, tags, submission links, and submission time
- **Easy Setup**: Just enter your Codeforces credentials once

---

## Installation

### Chrome/Edge
- Install directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/pehfoogjijedipaehbibmjcajbcbimef?utm_source=item-share-cb) or search **CF Fetcher**
- Pin the extension to your toolbar for quick access

---

## Usage

1. **Get API Keys**: Go to [Codeforces Settings → API](https://codeforces.com/settings/api) and generate keys
2. **Open Extension**: Click the CF Fetcher icon in your browser
3. **Enter Details**: Add your handle, API key, and secret key
4. **Generate**: Click "Generate" to create your ZIP file
5. **Download**: The file will download automatically
6. **Unzip**: Extract the contents of the ZIP file
7. **Upload**: Upload the extracted files to your GitHub repository

---

## Demo Video

<p>
  <a href="https://www.youtube.com/watch?v=yuKUnclnSl4" target="_blank">
    <img src="https://img.youtube.com/vi/yuKUnclnSl4/0.jpg" alt="Demo Video">
  </a>
</p>

---

## Screenshots

<!-- 
![Screenshot 1](https://raw.githubusercontent.com/Andrew-Velox/Codeforces-Submission-Fetcher-Extension/main/images/image.png)
![Screenshot 2](https://raw.githubusercontent.com/Andrew-Velox/Codeforces-Submission-Fetcher-Extension/main/images/Screenshot%202025-08-19%20205819.png) -->
<!-- ![Screenshot 3](./images/Screenshot 2025-08-14 202642.png) -->
<p>
  <img src="images/image.png" alt="Main UI">
</p>
<p>
  <img src="images/Screenshot 2025-08-19 205819.png" alt="Screenshot 1">
</p>
<p>
  <img src="images/Screenshot 2025-08-22 205116.png" alt="Screenshot 1" >
</p>
<p>
  <img src="images/Screenshot 2025-08-22 205300.png" alt="Screenshot 1" >
</p>
<!-- <p>
  <img src="images/Screenshot 2025-08-14 202642.png" alt="Screenshot 2" width="500">
</p> -->

---

## 🎯 Example Output

| # | Title | Solution | Tags | Submitted |
|:-:|-------|----------|------|-----------|
| 659 | [C - Removal of Unattractive Pairs](https://codeforces.com/contest/1907/problem/C) | [C++20 (GCC 13-64)](https://codeforces.com/contest/1907/submission/289768292) | `constructive algorithms` `greedy` `math` `strings` `*1200` | Nov/03/2024 06:18 PM |
| 658 | [C - Anya and 1100](https://codeforces.com/contest/2036/problem/C) | [C++20 (GCC 13-64)](https://codeforces.com/contest/2036/submission/289576902) | `brute force` `implementation` `*1100` | Nov/02/2024 10:30 PM |

[👉 Demo Repository](https://github.com/Andrew-Velox/my-codeforces-submissions)
---

## What's New (v1.1.0)

- Cleaner codebase: internal logic refactored to avoid repetition and improve maintainability
- Rating-wise filtering: When you generate the ZIP, your submissions are automatically grouped by problem rating. Each rating folder contains a README.md listing all problems of that rating in a markdown table for easy review.
- All previous features and formats are preserved

---

## Contributing

1. Fork the repository
2. Make your changes
3. Test the extension
4. Submit a pull request

---

## Support

- [GitHub Issues](https://github.com/Andrew-Velox/Codeforces-Submission-Fetcher-Extension/issues) for bugs and features
- [Demo Video](https://www.youtube.com/watch?v=yuKUnclnSl4) for usage help

If this helps you, please ⭐ star the repository!

---

**Happy Coding!** 🚀




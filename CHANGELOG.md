# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-15

### Added
- Initial release of CF Fetcher extension
- Automatic README.md generation from Codeforces submissions
- Support for Chrome and Firefox browsers
- API key management with local storage
- Smart duplicate submission filtering
- Problem difficulty ratings and tags display
- Direct links to problems and submissions
- Popup and tab mode support
- Auto-save credentials functionality
- Professional markdown table formatting

### Features
- Fetches only accepted submissions from Codeforces API
- Keeps latest submission for each problem
- Includes submission timestamps and programming languages
- Secure local storage of API credentials
- Cross-browser compatibility
- Clean and intuitive user interface

### Technical
- Manifest V3 Chrome extension
- Vanilla JavaScript implementation
- Tailwind CSS styling
- Chrome APIs: Storage, Downloads, Runtime
- MIT License

## [1.1.0] - 2025-08-22

### Changed
- Refactored code to eliminate repeated logic and improve maintainability
- Centralized README formatting logic for main and per-rating files

### Added
- Per-rating README.md files are now generated inside each rating folder in the ZIP
- Each README lists all problems for that rating in a markdown table, matching the main README format

### Fixed
- Minor syntax errors and improved code clarity

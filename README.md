dynamic-previews-native-hover-sidebar

# Dynamic Previews – Native, Hover, Sidebar

Preview your links in your sidebar, the hover editor, or native preview based on their type. This is a fork of [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor) designed for more efficient reference viewing and (as close as exists) inline editing of embeds.

## Features

### Choose Preview Modes by Link Format
Choose exactly how each link type is previewed:
- **Standard** - Regular links
- **Footnotes** (`[^1]`) - Native preview, floating editor, or sidebar
- **Headings** (`#Section`) - Navigate to specific sections instantly
- **Block references** (`#^blockid`) - Jump to precise locations
- **Embeds** (`![[note]]`, `![[image.png]]`) - Edit embedded content almost inline

### NEW: Sidebar Mode
Edit embedded notes and references **without leaving your current view** or pushing around popovers. The sidebar is now a secondary editing workspace - perfect for:
-  **Quick edits** while keeping your main note in focus
-  **Easier comparing of notes** side-by-side
- **Preview history** Navigate between viewed previews like a regular note pane
- (near) **seemless editing of embedded content**

Previews are not persistent and quickly accessible or hideable in your left or right sidebar


### Flexible Configuration
- **Per-link-type modes** - Footnotes in sidebar, headings floating, blocks native
- **Sidebar position** - Left or right, your choice
- **Auto-focus control** - Reveal sidebar without stealing focus
- **Trigger delay** - Fine-tune responsiveness

### Floating Hover Editor (Original Features)
All the power of Hover Editor remains:
- Resizable, draggable preview windows
- Pin multiple previews for reference
- Full editing capabilities in hover views
- Snap to screen edges
- Image zoom support

HUGE THANKS TO **NothingisLost** for making Hover Editor!

## Use Cases

### Research & Writing
Hover over citations while drafting → sidebar opens the source → edit notes inline → continue writing without context switching.

### Knowledge Base Management
Preview and edit linked notes instantly. Perfect for maintaining a web of interconnected ideas without losing your place.

### Embedded Content Workflow
Embed a note block → hover it → edit in sidebar → changes sync immediately. Near-inline editing with full editor features.

## Installation

### From Community Plugins (Pending Approval)
1. Open Settings → Community Plugins
2. Search "Sidebar Hover"
3. Install and enable


### BRAT

Install the BRAT plugin and put in XXXXXXXXXX 


### Manual Installation
1. Download `main.js`, `manifest.json`, `styles.css` from [latest release](https://github.com/kobuster/dynamic-previews-native-hover-sidebar/releases)
2. Create folder `VaultFolder/.obsidian/plugins/dynamic-previews-native-hover-sidebar/`
3. Copy files to folder
4. Reload Obsidian
5. Enable in Settings → Community Plugins
## ⚙️ Configuration

Open Settings → Sidebar Hover to configure:

**Preview Modes** - Set behavior for each link type (native/floating/sidebar)
**Sidebar Settings** - Position, auto-reveal, auto-focus
**Trigger Delay** - Milliseconds before preview appears
**View Mode** - Reading/editing/match current view

## 🙏 Credits & License

This plugin is a fork of [Hover Editor](https://github.com/nothingislost/obsidian-hover-editor) by [@nothingislost](https://github.com/nothingislost). The original Hover Editor pioneered floating preview windows in Obsidian - this fork adds sidebar mode and per-link-type configuration.

Licensed under MIT License. - see [LICENSE](https://github.com/kobuster/dynamic-previews-native-hover-sidebar/LICENSE.md) file.

Original Hover Editor © nothingislost  
Dynamic Previews © Kobuster

## ☕ Support Development

If this plugin enhances your workflow, consider fueling my addiction:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow.svg)](https://ko-fi.com/kobuster)

[![Donate with PayPal](https://img.shields.io/badge/PayPal-Donate-blue?logo=paypal)](PayPal.me/Kobuster)

Contributions help motivate me to maintain and improve this plugin. Who am I kidding.

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? [Open an issue](https://github.com/kobuster/dynamic-previews-native-hover-sidebar)


## 📝 Changelog

See [RELEASES](https://github.com/kobuster/dynamic-previews-native-hover-sidebar
/releases) for version history.
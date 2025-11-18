import { App, PluginSettingTab, Setting, requireApiVersion } from "obsidian";

import HoverEditorPlugin from "../main";
import { parseCssUnitValue } from "../utils/misc";

export interface HoverEditorSettings {
  defaultMode: string;
  autoPin: string;
  triggerDelay: number;
  closeDelay: number;
  autoFocus: boolean;
  rollDown: boolean;
  snapToEdges: boolean;
  initialHeight: string;
  initialWidth: string;
  showViewHeader: boolean;
  imageZoom: boolean;
  footnotes: "native" | "floating" | "sidebar";
  headings: "native" | "floating" | "sidebar";
  blocks: "native" | "floating" | "sidebar";
  hoverEmbeds: "native" | "floating" | "sidebar";
  sidebarAutoFocus: boolean;
  sidebarPosition: "left" | "right";
  sidebarAutoReveal: boolean;
  regularLinks: "native" | "floating" | "sidebar";
}

export const DEFAULT_SETTINGS: HoverEditorSettings = {
  regularLinks: "sidebar",
  defaultMode: "match",
  autoPin: "onMove",
  triggerDelay: 300,
  closeDelay: 600,
  autoFocus: true,
  rollDown: false,
  snapToEdges: false,
  initialHeight: "340px",
  initialWidth: "400px",
  showViewHeader: false,
  imageZoom: true,
  footnotes: "native",
  headings: "sidebar", 
  blocks: "floating",
  hoverEmbeds: "sidebar",
  sidebarAutoFocus: false,
  sidebarPosition: "right",
  sidebarAutoReveal: true,
};

export const modeOptions = {
  preview: "Reading view",
  source: "Editing view",
  match: "Match current view",
};

export const pinOptions = {
  onMove: "On drag or resize",
  always: "Always",
};

export class SettingTab extends PluginSettingTab {
  plugin: HoverEditorPlugin;

  constructor(app: App, plugin: HoverEditorPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  hide() {}

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl("h3", { text: "General Settings" });

    new Setting(containerEl).setName("View Mode").addDropdown(cb => {
      cb.addOptions(modeOptions);
      cb.setValue(this.plugin.settings.defaultMode);
      cb.onChange(async value => {
        this.plugin.settings.defaultMode = value;
        await this.plugin.saveSettings();
      });
    });

    new Setting(containerEl)
      .setName("Trigger Delay (ms)")
      .setDesc("How long to wait before showing the Hover Editor or Sidebar Preview when hovering over a link")
      .addText(textfield => {
        textfield.setPlaceholder(String(this.plugin.settings.triggerDelay));
        textfield.inputEl.type = "number";
        textfield.setValue(String(this.plugin.settings.triggerDelay));
        textfield.onChange(async value => {
          this.plugin.settings.triggerDelay = Number(value);
          this.plugin.saveSettings();
        });
      });

    containerEl.createEl("h3", { text: "Preview Modes" });

    new Setting(containerEl)
  .setName("Regular links")
  .setDesc("How to preview regular note links ([[Note]])")
  .addDropdown(dropdown =>
    dropdown
      .addOption("native", "Native preview")
      .addOption("floating", "Floating hover editor")
      .addOption("sidebar", "right or left sidebar")
      .setValue(this.plugin.settings.regularLinks)
      .onChange(async (value: "native" | "floating" | "sidebar") => {
        this.plugin.settings.regularLinks = value;
        await this.plugin.saveSettings();
      })
  );


  new Setting(containerEl)
    .setName("Heading links")
    .setDesc("How to preview links to headings (#Heading)")
    .addDropdown(dropdown =>
      dropdown
        .addOption("native", "Native preview")
        .addOption("floating", "Floating hover editor")
        .addOption("sidebar", "right or left sidebar")
        .setValue(this.plugin.settings.headings)
        .onChange(async (value: "native" | "floating" | "sidebar") => {
          this.plugin.settings.headings = value;
          await this.plugin.saveSettings();
        })
    );

  new Setting(containerEl)
    .setName("Block links")
    .setDesc("How to preview links to blocks (#^blockid)")
    .addDropdown(dropdown =>
      dropdown
        .addOption("native", "Native preview")
        .addOption("floating", "Floating hover editor")
        .addOption("sidebar", "right or left sidebar")
        .setValue(this.plugin.settings.blocks)
        .onChange(async (value: "native" | "floating" | "sidebar") => {
          this.plugin.settings.blocks = value;
          await this.plugin.saveSettings();
        })
    );

  new Setting(containerEl)
    .setName("Embed links")
    .setDesc("How to preview embedded content (![[image]] or ![[note]])")
    .addDropdown(dropdown =>
      dropdown
        .addOption("native", "Native preview")
        .addOption("floating", "Floating hover editor")
        .addOption("sidebar", "right or left sidebar")
        .setValue(this.plugin.settings.hoverEmbeds)
        .onChange(async (value: "native" | "floating" | "sidebar") => {
          this.plugin.settings.hoverEmbeds = value;
          await this.plugin.saveSettings();
        })
    );

    
    new Setting(containerEl)
    .setName("Footnote links")
    .setDesc("How to preview footnote links ([^1])")
    .addDropdown(dropdown =>
      dropdown
        .addOption("native", "Native preview")
        .addOption("floating", "Floating hover editor")
        .addOption("sidebar", "right or left sidebar")
        .setValue(this.plugin.settings.footnotes)
        .onChange(async (value: "native" | "floating" | "sidebar") => {
          this.plugin.settings.footnotes = value;
          await this.plugin.saveSettings();
        })
    );

  containerEl.createEl("h3", { text: "Sidebar Modes" });

      new Setting(containerEl)
      .setName("Sidebar position")
      .setDesc("Which sidebar to use for preview. Requires restarting the plugin to take effect.")
      .addDropdown(dropdown =>
        dropdown
          .addOption("left", "Left sidebar")
          .addOption("right", "Right sidebar")
          .setValue(this.plugin.settings.sidebarPosition)
          .onChange(async (value: "left" | "right") => {
            this.plugin.settings.sidebarPosition = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Auto-reveal sidebar")
      .setDesc("Automatically open/reveal the sidebar when hovering links")
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.sidebarAutoReveal)
          .onChange(async (value) => {
            this.plugin.settings.sidebarAutoReveal = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Auto-focus sidebar")
      .setDesc("Automatically move cursor focus to the sidebar preview")
      .addToggle(toggle =>
        toggle
          .setValue(this.plugin.settings.sidebarAutoFocus)
          .onChange(async (value) => {
            this.plugin.settings.sidebarAutoFocus = value;
            await this.plugin.saveSettings();
          })
      );

  containerEl.createEl("h3", { text: "Hover Settings" });

  
    new Setting(containerEl)
      .setName("Auto Focus")
      .setDesc("Set the hover editor as the active pane when opened")
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.autoFocus).onChange(value => {
          this.plugin.settings.autoFocus = value;
          this.plugin.saveSettings();
        }),
      );

          new Setting(containerEl).setName("Auto Pin").addDropdown(cb => {
      cb.addOptions(pinOptions);
      cb.setValue(this.plugin.settings.autoPin);
      cb.onChange(async value => {
        this.plugin.settings.autoPin = value;
        await this.plugin.saveSettings();
      });
    });

    new Setting(containerEl)
      .setName("Minimize downwards")
      .setDesc("When double clicking to minimize, the window will roll down instead of rolling up")
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.rollDown).onChange(value => {
          this.plugin.settings.rollDown = value;
          this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Snap to edges")
      .setDesc(
        `Quickly arrange popovers by dragging them to the edges of the screen. The left and right edges 
        will maximize the popover vertically. The top edge will maximize the popover to fill the entire 
        screen. Dragging the popovers away from the edges will restore the popver to its original size.`,
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.snapToEdges).onChange(value => {
          this.plugin.settings.snapToEdges = value;
          this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Show view header by default")
      .setDesc(
        `Show the view header by default when triggering a hover editor.
         When disabled, view headers will only show if you click the view header icon to the left of the minimize button.`,
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.showViewHeader).onChange(value => {
          this.plugin.settings.showViewHeader = value;
          this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Click to zoom image")
      .setDesc(
        `Click and hold an image within a hover editor to temporarily maximize the popover and image to fill the entire viewport. 
        On mouse up, the hover editor will restore to its original size.`,
      )
      .addToggle(toggle =>
        toggle.setValue(this.plugin.settings.imageZoom).onChange(value => {
          this.plugin.settings.imageZoom = value;
          this.plugin.saveSettings();
        }),
      );

    new Setting(containerEl)
      .setName("Initial popover width")
      .setDesc("Enter any valid CSS unit")
      .addText(textfield => {
        textfield.setPlaceholder(this.plugin.settings.initialWidth);
        textfield.inputEl.type = "text";
        textfield.setValue(this.plugin.settings.initialWidth);
        textfield.onChange(async value => {
          value = parseCssUnitValue(value);
          if (!value) value = DEFAULT_SETTINGS.initialWidth;
          this.plugin.settings.initialWidth = value;
          this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Initial popover height")
      .setDesc("Enter any valid CSS unit")
      .addText(textfield => {
        textfield.setPlaceholder(String(this.plugin.settings.initialHeight));
        textfield.inputEl.type = "text";
        textfield.setValue(String(this.plugin.settings.initialHeight));
        textfield.onChange(async value => {
          value = parseCssUnitValue(value);
          if (!value) value = DEFAULT_SETTINGS.initialHeight;
          this.plugin.settings.initialHeight = value;
          this.plugin.saveSettings();
        });
      });

    new Setting(containerEl)
      .setName("Hover Close Delay (ms)")
      .setDesc("How long to wait before closing a Hover Editor once the mouse leaves")
      .addText(textfield => {
        textfield.setPlaceholder(String(this.plugin.settings.closeDelay));
        textfield.inputEl.type = "number";
        textfield.setValue(String(this.plugin.settings.closeDelay));
        textfield.onChange(async value => {
          this.plugin.settings.closeDelay = Number(value);
          this.plugin.saveSettings();
        });
      });
  }
}

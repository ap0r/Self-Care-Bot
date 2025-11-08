const Desklet = imports.ui.desklet;
const St = imports.gi.St;
const Mainloop = imports.mainloop;

function HelloDesklet(metadata, desklet_id) {
    this._init(metadata, desklet_id);
}

HelloDesklet.prototype = {
    __proto__: Desklet.Desklet.prototype,

    _init: function(metadata, desklet_id) {
        Desklet.Desklet.prototype._init.call(this, metadata, desklet_id);

        // List of messages with emojis
        this.messages = [
            "Drink water 💧",
            "Text a friend 🫶",
            "Take a deep breath 🌬️",
            "Look outside 👀",
            "Get up and stretch 🧘",
            "Rest your eyes 👁️👁️",
            "Respond to a friend 🗣️",
            "Look at some nature 🪴",
            "Trouble? Ask for help 👥",
            "Take your medication 💊",
            "Play calming music 🎶",
            "Remember something nice 🧠",
            "Take a break from social media 📱"

        ];

        this.currentIndex = 0;
        this.setupUI();
        this.startTimer();
    },

    setupUI: function() {
        // Main container
        this.window = new St.Bin({
            style_class: 'desklet-container',
            x_fill: true,
            y_fill: true
        });

        // Label to display the message
        this.text = new St.Label({
            style_class: 'desklet-label',
            text: this.messages[this.currentIndex]
        });

        this.window.add_actor(this.text);
        this.setContent(this.window);
    },

    startTimer: function() {
        // Update message every 600 seconds
        this.timer = Mainloop.timeout_add_seconds(600, () => {
            this.updateMessage();
            return true; // Return true to keep the timer running
        });
    },

    updateMessage: function() {
        // Cycle to the next message
        this.currentIndex = (this.currentIndex + 1) % this.messages.length;
        this.text.set_text(this.messages[this.currentIndex]);
    },

    on_desklet_removed: function() {
        // Clean up the timer when desklet is removed
        if (this.timer) {
            Mainloop.source_remove(this.timer);
            this.timer = null;
        }
    }
};

function main(metadata, desklet_id) {
    return new HelloDesklet(metadata, desklet_id);
}


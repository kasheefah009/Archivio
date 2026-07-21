
export const CATEGORIES = [
    {
        id: "account",
        label: "Account & Profile",
        description: "Learn how to manage your account.",
        swatch: "#E8734A",
    },
    {
        id: "projects",
        label: "Projects & Collections",
        description: "Learn how projects and collections work.",
        swatch: "#D8CBB0",
    },
    {
        id: "community",
        label: "Community",
        description: "Learn how discussion and community features work.",
        swatch: "#4C8A72",
    },
    {
        id: "billing",
        label: "Plans & Billing",
        description: "Learn how to manage your plan and billing.",
        swatch: "#B8933A",
    },
    {
        id: "privacy",
        label: "Privacy & Security",
        description: "Learn how your data and account are protected.",
        swatch: "#4A6FA5",
    },
    {
        id: "technical",
        label: "Troubleshooting",
        description: "Learn how to resolve common issues.",
        swatch: "#8A8A86",
    },
];

export const ARTICLES = [
    {
        id: "update-profile-name",
        categoryId: "account",
        section: "Set up your account",
        title: "Update your profile name",
        description: "Follow these steps to update your profile name from account settings.",
        updated: "Edited 3 weeks ago",
        content:
            "Go to Settings, then Profile. Select your current name, type the new one, and confirm. Your name updates everywhere on Archivio immediately, including on any comments you've already posted.",
    },
    {
        id: "set-password",
        categoryId: "account",
        section: "Set up your account",
        title: "Set, change, or remove your password",
        description: "Password logins aren't required by default, but you can add one anytime.",
        updated: "Edited 3 weeks ago",
        content:
            "By default, Archivio accounts sign in with a magic link sent to your email, so no password is required. If you'd prefer a password, go to Settings, then Security, and select Add password. You can change or remove it from the same screen at any time.",
    },
    {
        id: "upload-photo",
        categoryId: "account",
        section: "Set up your account",
        title: "Upload your profile photo",
        description: "Personalize your profile with a photo other members will see.",
        updated: "Edited 1 month ago",
        content:
            "Go to Settings, then Profile, and select your avatar circle. Upload a square image at least 200x200px. It appears next to your name on saved projects, collections, and comments.",
    },
    {
        id: "delete-account",
        categoryId: "account",
        section: "Manage your account",
        title: "Delete your account",
        description: "Permanently remove your profile and data after a grace period.",
        updated: "Edited 1 month ago",
        content:
            "Go to Settings, then Account, and select Delete account. Your profile, saved projects, and private collections are removed after a 14-day grace period, during which you can cancel the deletion by logging back in.",
    },
    {
        id: "change-login-email",
        categoryId: "account",
        section: "Manage your account",
        title: "Change your login email",
        description: "Your login email can differ from the one you use for notifications.",
        updated: "Edited 2 months ago",
        content:
            "Go to Settings, then Account details, and update your email. You'll get a confirmation link at the new address — your login switches over once you confirm it, and the old address stops working.",
    },
    {
        id: "project-vs-collection",
        categoryId: "projects",
        section: "The basics",
        title: "Projects vs. collections, explained",
        description: "Understand the difference between a project and a collection.",
        updated: "Edited 2 weeks ago",
        content:
            "A project is a single building entry in the Archivio archive. A collection is a group of projects, curated by our team or by you, organized around a theme like material, region, or era.",
    },
    {
        id: "suggest-project",
        categoryId: "projects",
        section: "The basics",
        title: "Suggest a new project",
        description: "Recommend a building that isn't in the archive yet.",
        updated: "Edited 2 weeks ago",
        content:
            "Use the Suggest a project link on any Explore page. Include the building name, location, and a source for photos if you have one. Our team reviews submissions weekly.",
    },
    {
        id: "make-collection-public",
        categoryId: "projects",
        section: "Managing collections",
        title: "Make a collection public",
        description: "Share a collection with other members instead of keeping it private.",
        updated: "Edited 1 month ago",
        content:
            "Open the collection, select the settings icon, and toggle Public. Public collections are visible on your profile and can be found through search; private collections stay visible only to you.",
    },
    {
        id: "reorder-projects",
        categoryId: "projects",
        section: "Managing collections",
        title: "Reorder projects within a collection",
        description: "Change the sequence projects appear in inside a collection.",
        updated: "Edited 1 month ago",
        content:
            "Open the collection in edit mode and drag any project card to a new position. The order you set is what other members see if the collection is public.",
    },
    {
        id: "community-status",
        categoryId: "community",
        section: "Getting started",
        title: "Is Community live yet?",
        description: "Community is still being built — here's what to expect.",
        updated: "Edited 1 week ago",
        content:
            "Community is still in progress, which is why you'll see a Coming soon notice if you try to open it today. It'll bring member profiles, project sharing, and public discussion threads. We'll announce the launch in the Journal.",
    },
    {
        id: "journal-comments",
        categoryId: "community",
        section: "Getting started",
        title: "How comments on Journal articles work",
        description: "Comment threads are available today, ahead of full Community.",
        updated: "Edited 1 week ago",
        content:
            "Any signed-in member can comment on a Journal article. Replies are threaded one level deep. Select Follow on a comment to get notified of new replies to it.",
    },
    {
        id: "is-free",
        categoryId: "billing",
        section: "Plans",
        title: "Is Archivio free to use?",
        description: "What's included at no cost, and what Pro will add later.",
        updated: "Edited 3 weeks ago",
        content:
            "Browsing, saving projects, and creating collections is free with no limit. A Pro plan is planned for advanced curation tools and higher-resolution downloads, but nothing is billed today.",
    },
    {
        id: "student-pricing",
        categoryId: "billing",
        section: "Plans",
        title: "Student and academic pricing",
        description: "Discounted access is planned alongside the Pro launch.",
        updated: "Edited 3 weeks ago",
        content:
            "We're planning discounted pricing for students and educators when Pro launches. Join the mailing list from Settings to be notified as soon as it's available.",
    },
    {
        id: "update-payment",
        categoryId: "billing",
        section: "Billing",
        title: "Update your payment details",
        description: "Change the card or billing address on file.",
        updated: "Edited 1 month ago",
        content:
            "Once billing is live, you'll manage payment details from Settings, then Billing. Nothing is charged on Archivio today, so this section is currently informational only.",
    },
    {
        id: "collection-visibility",
        categoryId: "privacy",
        section: "Privacy",
        title: "Who can see the collections I create?",
        description: "Collections are private unless you choose to publish them.",
        updated: "Edited 2 weeks ago",
        content:
            "Collections are private by default and visible only to you. You can make a specific collection public from its settings menu at any time; only public collections appear on your profile or in search.",
    },
    {
        id: "profile-visibility",
        categoryId: "privacy",
        section: "Privacy",
        title: "Control who sees your profile",
        description: "Choose whether your profile is visible to other members.",
        updated: "Edited 2 weeks ago",
        content:
            "Go to Settings, then Privacy, to set your profile to public or members-only. Members-only profiles are visible to signed-in Archivio users but not indexed publicly.",
    },
    {
        id: "two-factor",
        categoryId: "privacy",
        section: "Security",
        title: "Enable two-factor authentication",
        description: "Add an extra layer of protection to your login.",
        updated: "Edited 1 month ago",
        content:
            "Go to Settings, then Security, and select Enable two-factor authentication. You'll scan a QR code with an authenticator app and enter a one-time code to confirm setup.",
    },
    {
        id: "images-not-loading",
        categoryId: "technical",
        section: "Common issues",
        title: "Images aren't loading on Explore",
        description: "Try a hard refresh before reporting a broader outage.",
        updated: "Edited 1 week ago",
        content:
            "Try a hard refresh first with Ctrl or Cmd, Shift, and R. If images still don't load, it's likely an upstream image host issue on our end. Check the status page, and if it's not listed, report it to us directly.",
    },
    {
        id: "search-no-results",
        categoryId: "technical",
        section: "Common issues",
        title: "Search isn't returning results",
        description: "Common causes and how to work around them while we look into it.",
        updated: "Edited 1 week ago",
        content:
            "Search can lag behind newly added projects by a few minutes. If a well-known building still doesn't turn up after that, try alternate spellings or the architect's name, and report it if the problem continues.",
    },
    {
        id: "report-bug",
        categoryId: "technical",
        section: "Reporting",
        title: "Report a bug",
        description: "What to include so engineering can reproduce it quickly.",
        updated: "Edited 1 month ago",
        content:
            "Email us with a screenshot, the page URL, and what you expected to happen versus what happened instead. Technical reports go straight to the engineering queue rather than general support.",
    },
];

export function getArticlesByCategory(categoryId) {
    return ARTICLES.filter((a) => a.categoryId === categoryId);
}

export function getArticleCount(categoryId) {
    return ARTICLES.filter((a) => a.categoryId === categoryId).length;
}

export function getArticle(categoryId, articleId) {
    return ARTICLES.find((a) => a.categoryId === categoryId && a.id === articleId);
}

export function getCategory(categoryId) {
    return CATEGORIES.find((c) => c.id === categoryId);
}
// Utility function for creating page URLs
export const createPageUrl = (pageName) => {
    const routes = {
        'Home': '/',
        'Browse': '/browse',
        'Submit': '/submit',
        'AdminDashboard': '/admin',
        'About': '/about'
    };
    return routes[pageName] || '/';
};

// Format date
export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Truncate text
export const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

// Category display names
export const getCategoryDisplay = (category) => {
    const categories = {
        'kindness': 'Acts of Kindness',
        'achievement': 'Achievements',
        'community': 'Community Impact',
        'environment': 'Environmental',
        'health': 'Health & Wellness',
        'education': 'Education',
        'other': 'Other'
    };
    return categories[category] || category;
};

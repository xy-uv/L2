const userTheme = "Dark Theme";

const selectedTheme = userTheme ?? "Light theme";

console.log(selectedTheme);

const isAuthenticated = null;

const resultWithTernary = isAuthenticated ? isAuthenticated : "You are guest !";

const resultWithNullish = isAuthenticated ?? "You are guest !";

console.log({ resultWithTernary }, { resultWithNullish });

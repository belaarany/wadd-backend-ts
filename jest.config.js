module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	modulePaths: ["node_modules"],
	"moduleNameMapper": {
		"^src/(.*)$": "<rootDir>/src/$1"
	  }
};
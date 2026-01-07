// Fix for libs that have NodeJS global checks or usage
// See: https://stackoverflow.com/questions/52744489/uncaught-referenceerror-global-is-not-defined-while-using-plotly-in-angular-6
window.global = window

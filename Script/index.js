async function main() {
    console.log("Hi there");
}

window.onload = main().catch(err => console.log(err));
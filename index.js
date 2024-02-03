import { createInterface } from "node:readline";

const cli = createInterface({
  input: process.stdin,
  output: process.stdout,
});


cli.setPrompt("Enter a command: ")
cli.prompt(true)


cli.on("line", (input) => {
  console.log(`You enterd ${input}`);


  if(input.includes(".exit")){
    cli.close()
  }else{
    cli.prompt()
  }

})

cli.on("close", () => {
  console.log("Good Bye! :)")
  process.exit(0);
})

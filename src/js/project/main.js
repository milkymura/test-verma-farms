

function common() {
  $(document).foundation();
  waves()
}



function main(scriptToLoad) {
  common()


  const triggerScript = {
    'home': homePage
  }[scriptToLoad]

  triggerScript()
}
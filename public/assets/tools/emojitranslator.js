(function(){
  var map={
    happy:":-)", sad:":-(",  love:"<3",   heart:"<3",
    sun:"[sun]",  moon:"[moon]", star:"[star]", fire:"[fire]",
    water:"[~]",  earth:"[O]",  rain:"[r]",  snow:"[*]",
    food:"[f]",   pizza:"[p]",  coffee:"[c]", beer:"[b]",
    cat:"[cat]",  dog:"[dog]",  fish:"[^]",  bird:"[>]",
    tree:"[T]",   flower:"[fl]", music:"[♪]", sport:"[s]",
    game:"[G]",   book:"[B]",   home:"[H]",  car:"[C]",
    plane:"[>]",  money:"[$]",  work:"[W]",  phone:"[P]",
    computer:"[pc]", sleep:"[z]", laugh:"xD", cry:"TT",
    angry:"[!]",  cool:"B)",   party:"\\o/", gift:"[g]",
    good:"(+1)",  bad:"(-1)",  strong:"[s]", run:"[>]",
    eat:"[e]",    gym:"[G]",   travel:"[T]", idea:"[!]",
    yes:"[Y]",    no:"[N]",    warning:"[W]", code:"[{}]",
    art:"[art]"
  };
  document.getElementById("et-go").onclick = function() {
    var text = document.getElementById("et-in").value;
    var result = text.replace(/\b(\w+)\b/g, function(word) {
      var em = map[word.toLowerCase()];
      return em ? word + " " + em : word;
    });
    document.getElementById("et-out").textContent = result || "Type something above!";
  };
})();
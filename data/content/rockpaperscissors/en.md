## The oldest hand game in the world

Rock Paper Scissors is one of the most universally recognised games on earth. Two players simultaneously reveal one of three hand shapes — a closed fist for rock, a flat palm for paper, or two extended fingers for scissors — and a simple set of rules decides who wins. Rock crushes scissors, scissors cut paper, paper covers rock. Despite that apparent simplicity, the game has inspired decades of research in game theory, psychology, and competitive strategy, and has been used in everything from playground disputes to legal disputes between companies settling disagreements over which auction house would handle an estate sale.

The game traces its roots to China, where a version called shoushiling appears in written records dating back to the Han dynasty, roughly two thousand years ago. From China it spread through Japan, where it became known as jan-ken-pon and evolved into the three-gesture format most people recognise today. European traders and missionaries brought the game westward during the seventeenth and eighteenth centuries, and by the twentieth century it had spread to virtually every corner of the globe. The World Rock Paper Scissors Society was founded in 1918 in Toronto and still runs annual world championships today, complete with sponsorship, prize money, and competitors travelling from dozens of countries.

## How the game works in the browser

This version of Rock Paper Scissors pits you against a computer opponent that chooses its move completely at random with equal probability for all three options. There is no hidden bias, no learning algorithm, and no memory of previous rounds. Every game is statistically independent. Click one of the three emoji buttons — fist, open hand, or scissor fingers — and the result appears immediately. A running score beneath the board tracks how many rounds you have won, how many the computer has won, and how many have ended in a draw.

The randomness is implemented using the browser's built-in Math.random function, which generates a pseudorandom number and maps it to one of the three choices. While this is not cryptographically secure randomness, it is entirely sufficient for a game where the outcome distribution is what matters. Each choice appears roughly one third of the time over many rounds, which is exactly what a fair opponent should do.

## Strategy against a random opponent

In strict mathematical terms, there is no strategy that outperforms random play when your opponent is also playing randomly. Each of the nine possible round outcomes (three choices for you, three for the opponent) has an equal probability of one ninth. Across those nine outcomes, exactly three result in a draw, three in a win for you, and three in a loss, giving each side a one-third chance of winning any given round. No matter what sequence of moves you make, the expected win rate against a truly random opponent is precisely one third.

This mathematical reality does not stop people from trying, of course, and that is part of the appeal. The brain naturally looks for patterns even in random data, and many players convince themselves they have identified a tendency in the computer's choices when what they are actually seeing is normal statistical noise. Over a hundred rounds the win, loss, and draw counts will cluster around thirty-three each, with fluctuations both above and below that expectation. Short runs will always look lopsided, because random sequences are genuinely lumpy rather than neatly alternating.

Against human opponents, however, strategy becomes very real. Research in cognitive science and behavioural economics has shown that people are not random. They exhibit predictable biases: they tend to repeat a winning move, switch away from a losing move, and choose rock more often than paper or scissors on their very first throw. Competitive players exploit these tendencies. The psychology of the game becomes a kind of fast, silent negotiation about what each player thinks the other is likely to do next.

## Competitive Rock Paper Scissors

Professional Rock Paper Scissors tournaments exist and attract serious competitors. The World RPS Society championships have been held since 2002, with hundreds of entrants paying entry fees and competing through elimination brackets. At the highest levels, competitors study their opponents over multiple rounds, looking for any deviation from random play that they can exploit. Some players claim to be able to provoke particular responses by their body language, verbal cues, or the rhythm of the countdown. Others adopt a rigorously randomised strategy on purpose, precisely to deny their opponents any exploitable signal.

Notable uses of the game outside the playground include a 2006 legal case in Florida where a judge ordered two law firms that could not agree on a meeting location to settle the dispute with Rock Paper Scissors. Christie's and Sotheby's, the famous auction houses, were once asked by a Japanese company to compete for a consignment of Impressionist paintings using the game. Christie's consulted the daughters of its chairman, who advised going with scissors because, they reasoned, everyone always leads with rock. They won.

## Using the score tracker

The score display beneath the buttons gives you a running tally of wins, computer wins, and draws for your current session. This is useful if you want to track your results across a meaningful sample of games. A few dozen rounds is enough to see whether the distribution is approaching the expected one-third ratio, and watching the score evolve in real time is a surprisingly engaging experience even against a random opponent. If you want to start fresh, just reload the page and the counters reset to zero.


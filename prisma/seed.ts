import { db } from '@/lib/db';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed Books
  const books = await Promise.all([
    db.book.upsert({
      where: { slug: 'shadows-of-thornfield-hall' },
      update: {},
      create: {
        title: 'The Shadows of Thornfield Hall',
        slug: 'shadows-of-thornfield-hall',
        description: 'A gripping gothic mystery that unravels the dark secrets of Thornfield Hall. When journalist Eleanor Price receives an anonymous letter inviting her to the decaying manor, she discovers that the walls themselves hold memories of a crime that was never solved. As she delves deeper, the line between past and present begins to blur, and Eleanor realizes the shadows aren\'t just in the hall—they\'re following her.',
        snippet: `The letter arrived on a Tuesday, which Eleanor would later consider odd—important things, in her experience, never came on Tuesdays. It was written on paper so thick it could have held a secret simply by its weight, and the handwriting was the kind of deliberate script that suggested its author had practiced each stroke before committing ink to page.

"Dear Ms. Price," it began, and she noticed there was no return address, no postmark she recognized—only her name and the words that would change everything: "Thornfield Hall remembers what everyone else has forgotten."

She should have thrown it away. She knew that. Twenty years as an investigative journalist had taught her that anonymous letters led to dead ends, crank callers, and wasted afternoons. But something about the paper, the ink, the careful way each letter had been formed—it was as if the author had wanted her to know this was different. This was real.

By Wednesday evening, Eleanor was on a train heading north, watching the city dissolve into countryside, the flatlands give way to rolling hills, and the rain begin to fall in that persistent way that said it had no intention of stopping.

The hall appeared through the mist like a half-remembered dream—turrets and gables and windows that seemed to watch her approach with the patience of something that had been waiting a very long time. The door was already open. Just slightly. Just enough.

"Thornfield Hall remembers," she whispered, and stepped inside.

The darkness swallowed her immediately—not the absence of light, but something more intentional, as if the house had drawn the night inside and decided to keep it. Her footsteps echoed on marble floors that hadn't seen a visitor in years, and somewhere deep within the walls, she heard it: the faintest sound of a clock, still ticking after all this time.

She was not alone. She knew it with the certainty that had kept her alive in war zones and kept her writing when the world told her to stop. Someone—or something—was here, in the shadows of Thornfield Hall, waiting for her to find the truth that had been buried for decades.

And the truth, she would discover, was far more terrible than any fiction she had ever written.`,
        fullContent: `The letter arrived on a Tuesday, which Eleanor would later consider odd—important things, in her experience, never came on Tuesdays. It was written on paper so thick it could have held a secret simply by its weight, and the handwriting was the kind of deliberate script that suggested its author had practiced each stroke before committing ink to page.

"Dear Ms. Price," it began, and she noticed there was no return address, no postmark she recognized—only her name and the words that would change everything: "Thornfield Hall remembers what everyone else has forgotten."

She should have thrown it away. She knew that. Twenty years as an investigative journalist had taught her that anonymous letters led to dead ends, crank callers, and wasted afternoons. But something about the paper, the ink, the careful way each letter had been formed—it was as if the author had wanted her to know this was different. This was real.

[CONTINUED - Full content available to members only]

The hall had a way of making time irrelevant. Eleanor spent what felt like hours wandering through rooms that seemed to shift and rearrange themselves when she wasn't looking. Every corridor led to another question. Every locked door hinted at an answer just beyond reach.

She found the library first—a magnificent room with floor-to-ceiling shelves and a fireplace large enough to roast an ox. The books were ancient, their spines cracked and faded, but it wasn't the books that caught her attention. It was the portrait above the mantel.

A woman. Dark-haired, pale-skinned, with eyes that seemed to follow Eleanor around the room. The plaque beneath read: "Catherine Thornfield, 1923-1952."

"She disappeared, you know."

Eleanor spun around. A man stood in the doorway—tall, weathered, with the kind of face that suggested he'd spent his life outdoors and had the stories to prove it. He was perhaps sixty, with silver hair and hands that looked like they'd built things.

"Who are you?" Eleanor asked, though what she really wanted to ask was how he'd appeared without making a sound.

"Thomas Hale," he said. "I keep the grounds. Been doing it for forty years. And you must be the journalist."

"How did you—"

"The letter. It was my idea to send it." He stepped into the room, and Eleanor noticed the way he glanced at the portrait—quickly, like touching something hot. "We need someone from the outside. Someone who doesn't know the stories, the legends, the lies."

"What happened to Catherine Thornfield?"

Thomas was quiet for a long moment. Outside, the rain had found the windows and was tapping them like fingers seeking entry.

"Everyone in this village has a theory," he said finally. "But I'm the only one still alive who was here that night. And I'm telling you—it wasn't an accident. It was never an accident."

Eleanor looked back at the portrait. Catherine's eyes were steady, unblinking, and filled with something that might have been warning.

"Tell me everything," Eleanor said.

And Thomas Hale began to speak.

[The full novel continues across 47 chapters, following Eleanor's investigation into the disappearance of Catherine Thornfield, the dark history of the family that built the hall, and the terrifying truth that connects the past to the present in ways Eleanor never imagined.]`,
        coverImage: '/images/books/book1.png',
        genre: 'Gothic Mystery',
        publishedDate: '2024',
        featured: true,
        order: 1,
      },
    }),
    db.book.upsert({
      where: { slug: 'letters-from-the-amber-coast' },
      update: {},
      create: {
        title: 'Letters from the Amber Coast',
        slug: 'letters-from-the-amber-coast',
        description: 'An enchanting tale of love and discovery spanning three generations. When Clara inherits a crumbling villa on the Baltic coast, she finds a collection of letters that reveal a love story her grandmother never told. As Clara reads each letter, she\'s drawn into a world of wartime romance, impossible choices, and a secret that could change everything she thought she knew about her family.',
        snippet: `The villa was nothing like the photographs.

Clara stood at the iron gate, her suitcase balanced on the cobblestones, and tried to reconcile the building before her with the cheerful sun-drenched pictures her grandmother had shown her as a child. The paint was peeling now—once amber, now a faded memory of gold—and the garden had grown wild in the way that gardens do when no one is listening to them.

But the sea was the same. The Baltic stretched out beyond the garden wall, impossibly calm, catching the late afternoon light and turning it into something precious. Amber, Clara thought. Of course. The Amber Coast.

She found the key under a terracotta pot by the front door—her grandmother's voice in her memory saying, "Always under the pot, darling, always under the pot"—and turned it in a lock that groaned with the effort of being useful after so many years.

Inside, the villa smelled of salt and lavender and something older, something that reminded Clara of the old bookshop on Maple Street where she'd spent her childhood Saturdays. Dust motes danced in the thin beams of light that made it through the shutters, and the furniture sat draped in white sheets like patient ghosts waiting for permission to live again.

It was the desk that caught her attention. A massive oak writing desk in the corner of what must have been the sitting room, its surface covered in a fine layer of dust but otherwise exactly as her grandmother had left it. And there, in the top drawer—Clara knew without looking—there would be letters.

She pulled the drawer open, and the smell of old paper rushed out like a held breath finally released. Bundles of them, tied with ribbon the color of autumn leaves, each bundle labeled in her grandmother's careful hand: "Henrik—1943," "Henrik—1944," "Henrik—1945."

Clara's hands trembled as she lifted the first bundle. Her grandmother had never spoken of a Henrik. Not once in all the years of stories and tea and confidences shared between them. But here he was, preserved in ink and paper, waiting to be found.

She settled into the chair by the window—the one that faced the sea, the one her grandmother must have sat in while writing—and untied the ribbon.

"My dearest Henrik," the first letter began, and Clara's world shifted on its axis.`,
        fullContent: `The villa was nothing like the photographs.

Clara stood at the iron gate, her suitcase balanced on the cobblestones, and tried to reconcile the building before her with the cheerful sun-drenched pictures her grandmother had shown her as a child. The paint was peeling now—once amber, now a faded memory of gold—and the garden had grown wild in the way that gardens do when no one is listening to them.

[CONTINUED - Full content available to members only]

The letters told a story Clara had never imagined. Her grandmother—quiet, steady Maren who baked cinnamon rolls every Sunday and never raised her voice—had been deeply, desperately in love with a Danish resistance fighter named Henrik Andersen during the Second World War.

"I write to you from the edge of the world," the first letter began, dated March 1943, "and I want you to know that every word I write is a small act of defiance. They can take our homes, our freedom, our names—but they cannot take the words we write to those we love."

Each letter revealed more of the story: how Maren, then just nineteen, had been working as a translator for the occupying forces while secretly passing information to the resistance. How she'd met Henrik at a clandestine meeting in the cellar of a fisherman's cottage. How they'd fallen in love over coded messages and whispered conversations and the kind of bravery that Clara could barely comprehend.

But it was the later letters that broke Clara's heart. Letters from 1945, after the war, when Maren had made a choice that would define the rest of her life. A choice between Henrik and the life she'd built waiting for him. A choice that involved a different man, a different country, a different future.

"I chose safety," Maren wrote in her final letter, never sent. "I chose the easy path, and I have spent every day since wondering what would have happened if I'd chosen bravery instead. But perhaps that's the lesson of the Amber Coast—that amber itself is formed under pressure, and the most beautiful things come from the hardest choices."

Clara set the letters down and looked out at the sea. The sun was setting now, turning the water to molten gold, and she understood at last why her grandmother had left her this place. Not as a gift—a confession. And not as an inheritance—a chance to write a different ending.

[The full novel follows Clara's journey as she uncovers her grandmother's secret past, traces Henrik's descendants, and discovers that some love stories are too powerful to end with a single lifetime.]`,
        coverImage: '/images/books/book2.png',
        genre: 'Literary Fiction',
        publishedDate: '2023',
        featured: true,
        order: 2,
      },
    }),
    db.book.upsert({
      where: { slug: 'cartographers-daughter' },
      update: {},
      create: {
        title: "The Cartographer's Daughter",
        slug: 'cartographers-daughter',
        description: 'A sweeping historical adventure following Iris Blackwood, the daughter of a renowned 18th-century mapmaker who inherits her father\'s talent—and his enemies. When she discovers his final, unfinished map contains a coded message, Iris must navigate treacherous seas, warring empires, and her own heart to complete her father\'s legacy.',
        snippet: `Iris Blackwood could read a map before she could read a book.

It was her father's doing, of course. Jonathan Blackwood, cartographer to the Crown, keeper of secrets written in longitude and latitude, had taught his daughter that the world was not a fixed thing but a story being constantly rewritten. "Maps are not truth," he would say, spreading a new chart across the great oak table in his study. "Maps are conversation. Every line is a question, every border a negotiation."

Iris had believed him—until the day she found the map that shouldn't exist.

It was three months after the funeral. Three months of sorting through her father's papers, his instruments, his half-finished work. Three months of visitors offering condolences and asking, always asking, about the unfinished map—the one Jonathan had been working on when he died, the one that representatives from the Admiralty had come to the house to discuss, the one that had been the subject of hushed conversations behind closed doors.

They'd asked Iris about it, too, but she had nothing to tell them. She'd seen her father's maps a thousand times, could identify his hand the way most people recognized their own handwriting. But this last map, the one everyone wanted—it wasn't in his study. It wasn't in the strongbox. It wasn't anywhere.

Until, on a rainy Thursday afternoon, she found it rolled up inside the brass telescope her father had kept by the window—the one he said he used for watching ships, though their house was nowhere near the sea.

The map was unlike anything Iris had ever seen. Her father's work was precise, elegant, each coastline rendered with the confidence of a man who had charted it himself. But this—this was something else entirely. The lines were familiar but wrong, the proportions distorted in ways that made her eyes water. And there, in her father's unmistakable hand, written in the margin where only a cartographer's daughter would think to look, were four words:

"Find the fifth ocean."

Iris traced the words with her fingertip, feeling the indentation where her father's pen had pressed too hard. The fifth ocean. She knew the four—Atlantic, Pacific, Indian, Arctic—every schoolchild did. But a fifth?

She looked at the map again, really looked, and saw what she'd missed before: the distortions weren't errors. They were a code. And her father had left her the key.`,
        fullContent: `Iris Blackwood could read a map before she could read a book.

It was her father's doing, of course. Jonathan Blackwood, cartographer to the Crown, keeper of secrets written in longitude and latitude, had taught his daughter that the world was not a fixed thing but a story being constantly rewritten.

[CONTINUED - Full content available to members only]

The fifth ocean, Iris would discover over the coming months, was not a body of water at all—or rather, it was, but not in the way that maps typically measured such things. It was hidden in the spaces between the known and the unknown, in the blank margins of charts where cartographers wrote "Here Be Dragons" and left it at that.

Her father had found it. Or rather, he'd found evidence of it—a current that shouldn't exist, a temperature reading that defied explanation, a pattern in the migration of whales that suggested they knew something the mapmakers didn't. And he'd spent the last years of his life trying to chart it, trying to prove that the world held one more secret than anyone had imagined.

But Jonathan Blackwood hadn't been the only one looking. There were others—men with money and ships and no patience for the slow, careful work of science. Men who saw the fifth ocean not as a discovery but as an opportunity.

Iris found allies in unexpected places: a pirate cartographer named Sable who charted by starlight and kept her maps tattooed on her arms; a Portuguese navigator whose family had been searching for the same current for three generations; and a young doctor named William who was more interested in the medicinal properties of deep-sea creatures than in the politics of empire.

Together, they set sail on the Aurora, a ship that was as much library as vessel, with maps covering every surface and charts hanging from the rigging like flags of a country that existed only in the space between lines.

"The fifth ocean," Sable said one night, tracing a route across her own tattooed forearm, "is the ocean of what we don't know we don't know. And your father was the first to realize it was real."

"What did he call it?" Iris asked.

Sable smiled. "He called it Possibility."

[The full novel spans three continents, two love stories, and one impossible journey to the edge of the mapped world.]`,
        coverImage: '/images/books/book3.png',
        genre: 'Historical Adventure',
        publishedDate: '2023',
        featured: false,
        order: 3,
      },
    }),
    db.book.upsert({
      where: { slug: 'where-the-oak-trees-meet' },
      update: {},
      create: {
        title: 'Where the Oak Trees Meet',
        slug: 'where-the-oak-trees-meet',
        description: 'A tender, heart-warming novel about returning home and finding love where you least expect it. When chef Margot Henderson escapes London for her childhood village of Oakhaven, she plans to stay only long enough to sell her aunt\'s cottage. But the village has other plans—and so does the brooding woodworker next door.',
        snippet: `The thing about Oakhaven, Margot thought as she drove past the village sign for the first time in twelve years, was that it hadn't changed. Not really. The oaks were still enormous, their branches meeting over the lane like the fingers of old friends. The pub still had the same faded sign swinging in the breeze. And the cottage—Aunt Viv's cottage—was still exactly where she'd left it, at the end of Willow Lane, with its thatched roof and its crooked chimney and its garden that had always looked like it was keeping a secret.

Margot parked the car and sat for a moment, hands on the wheel, engine ticking as it cooled. She'd told herself this would be simple: sort through Aunt Viv's things, put the cottage on the market, and get back to London before the restaurant missed her. Simple. Clinical. Nothing emotional about it.

Then she looked up and saw him.

He was in the garden next door—Margot's garden, technically, since Aunt Viv's property line ran right up to the old stone wall. He was standing in the midst of a wild tangle of roses and lavender, shirt sleeves rolled up, hair falling across his forehead, holding a chisel like it was an extension of his hand. He was carving something into the wall—a pattern, maybe, or a word she couldn't quite see from this distance.

He looked up as her car door opened, and their eyes met across twelve years and ten feet of stone wall.

"Margot Henderson," he said, and the way he said her name—like he'd been practicing it, like it was something he'd kept in his pocket all this time—made her stomach do something it had no business doing.

"Daniel Ashworth," she replied, because of course it was him. Of course the boy she'd left behind was now a man standing in her aunt's garden with wood shavings in his hair and a look in his eyes that said he'd been waiting for this moment.

"Your aunt left me the garden," he said, which was not what she expected him to say.

"She left me the cottage," Margot said, which was not what she wanted to say.

They stared at each other across the wall, and Margot had the strangest feeling that the oaks were leaning in to listen.

"Well then," Daniel said, and smiled. "I suppose we'll be neighbors."

"I suppose we will," Margot said, and thought: This is going to be nothing like simple.`,
        fullContent: `The thing about Oakhaven, Margot thought as she drove past the village sign for the first time in twelve years, was that it hadn't changed. Not really. The oaks were still enormous, their branches meeting over the lane like the fingers of old friends.

[CONTINUED - Full content available to members only]

Margot had left Oakhaven the way most people leave small villages—quickly, quietly, and with the firm intention of never returning. London had seemed like the answer to every question the village couldn't ask: ambition, excitement, anonymity. And for twelve years, it had been exactly that.

But Aunt Viv's death had changed things. Not just because of the cottage, though that was complicated enough. Aunt Viv had left something else—a recipe book, handwritten, filled with dishes Margot remembered from childhood. Lemon posset with shortbread. Roast chicken with tarragon. A chocolate cake so rich it could make you cry.

And in the margins, in Aunt Viv's spidery hand, were notes. Not about cooking—about life. About the village. About Daniel.

"I always liked that boy," one note read, beside a recipe for rosemary bread. "Terrible shame about his father. He's built something beautiful, Margot. You should see it."

Margot had seen it. The carvings in the garden wall weren't decoration—they were a chronicle. Daniel had spent the years since she left turning that wall into a story: the village's history, told in oak and stone. And there, tucked into a corner Margot almost missed, was a small carving of two figures beneath a tree.

Two figures who looked, if you squinted, like a girl and a boy. Like Margot and Daniel. Like something that had never quite ended.

[The full novel is a warm, witty, and deeply moving story about the places that shape us, the people who wait for us, and the courage it takes to come home.]`,
        coverImage: '/images/books/book4.png',
        genre: 'Romance',
        publishedDate: '2024',
        featured: false,
        order: 4,
      },
    }),
    db.book.upsert({
      where: { slug: 'tea-shop-on-maple-lane' },
      update: {},
      create: {
        title: 'The Tea Shop on Maple Lane',
        slug: 'tea-shop-on-maple-lane',
        description: 'A charming, feel-good novel about community, second chances, and the healing power of a perfectly brewed cup of tea. When widow Fiona Campbell opens a tea shop in the Scottish Highlands, she doesn\'t expect to find herself at the heart of a village that has its own ideas about how things should be done.',
        snippet: `The kettle was whistling when Fiona Campbell made the most important decision of her life.

It wasn't a dramatic moment—no thunder, no crashing waves, no voice from the heavens. Just a kettle, whistling on an ancient stove in an even more ancient cottage, in a village so small it didn't appear on most maps. But Fiona had learned, in the fifty-three years she'd been alive and the two since David had died, that the most important moments rarely announced themselves.

She was making tea. Darjeeling, first flush, the one that tasted like spring rain and possibility. David had always said it was her best brew—"You put something in it that can't be taught, Fee," he'd say, and she'd laugh and tell him it was just hot water and leaves, and they'd both know it was more than that.

The cottage had been David's idea. A holiday home, he'd said. A place to come on weekends, to walk the hills, to breathe air that tasted different from the air in Edinburgh. They'd bought it twenty years ago, when they were young enough to believe in such things, and they'd come every summer without fail.

Then David got sick, and the summers stopped.

But the cottage remained. And now, standing in its tiny kitchen with the kettle screaming and the morning light coming through the window like honey, Fiona Campbell decided to stay.

Not for a weekend. Not for a summer. For good.

She would open a tea shop.

The thought arrived fully formed, like a guest who'd been waiting outside the door for years and finally decided to knock. A tea shop. Here, in the middle of nowhere, in a village with more sheep than people, in a cottage that was barely large enough to contain one person let alone a business.

It was ridiculous. It was impractical. It was the most sensible thing she'd ever thought.

"Right then," Fiona said to the empty kitchen, and poured the water over the leaves, and watched the color bloom like a sunrise in the pot.

The tea shop on Maple Lane was going to happen. All she needed was a name, a sign, and the kind of courage that comes in teacups.`,
        fullContent: `The kettle was whistling when Fiona Campbell made the most important decision of her life.

It wasn't a dramatic moment—no thunder, no crashing waves, no voice from the heavens. Just a kettle, whistling on an ancient stove in an even more ancient cottage, in a village so small it didn't appear on most maps.

[CONTINUED - Full content available to members only]

The village of Glendarroch had opinions. This was not surprising—small villages always do—but Glendarroch's opinions were delivered with a particular brand of Scottish directness that left no room for misunderstanding.

"A tea shop?" said Mrs. McAllister from the post office, as if Fiona had suggested opening a space program.

"Aye, a tea shop," Fiona said, standing her ground. "With proper tea. And scones. And those little sandwiches with the crusts cut off."

"Cutting the crusts off sandwiches," Mrs. McAllister said slowly, "is a crime against bread."

But Fiona was undeterred. She painted the front room of the cottage herself—a warm, deep green that reminded her of the hills—and found second-hand furniture that somehow looked like it had always been there. She hung David's favorite painting above the fireplace (a watercolor of the glen in autumn, done by a local artist who'd long since passed), and she put out a sign:

"Fee's — Tea & Company"

The first customer arrived before she'd finished hanging the sign. It was Hamish, the elderly farmer from up the road, who claimed he'd only come in because he was "dying of thirst and too old to climb the hill home without refreshment."

He ordered Darjeeling and stayed for three hours.

By the end of the first week, Fee's had regulars. By the end of the first month, it had become the kind of place where people came not just for tea but for the particular magic that happens when strangers sit down together and realize they have more in common than they thought.

[The full novel is a celebration of community, the healing power of friendship, and the extraordinary things that can happen when you pour someone a really good cup of tea.]`,
        coverImage: '/images/books/book5.png',
        genre: 'Contemporary Fiction',
        publishedDate: '2024',
        featured: false,
        order: 5,
      },
    }),
    db.book.upsert({
      where: { slug: 'beneath-the-surface' },
      update: {},
      create: {
        title: 'Beneath the Surface',
        slug: 'beneath-the-surface',
        description: 'A tense, atmospheric thriller set in a coastal town where nothing is as calm as it seems. Marine biologist Dr. Sarah Whitmore returns to her hometown to investigate a series of mysterious deaths in the harbor, only to discover that the sea is keeping secrets far more dangerous than anything on land.',
        snippet: `The body was the third one that month, and this time, it was personal.

Dr. Sarah Whitmore stood at the edge of the harbor, watching the police tape flutter in the salt wind, and tried to remember how to breathe. She'd been back in Thornhaven for exactly forty-seven hours, and already the town was living up to its reputation: beautiful from a distance, treacherous up close.

"Sarah?" DI Cooper appeared at her elbow, his face gray with exhaustion. "I thought you should see this before we move him."

She shouldn't have looked. She knew that the way she knew the tides—instinctively, deeply, with the certainty of someone who'd spent her life studying things that were better left undisturbed. But she looked anyway, because that's what Sarah Whitmore did: she looked at things other people turned away from.

The body was a man, mid-fifties, dressed in the waterproof trousers and heavy jumper that marked him as a fisherman. His face was peaceful—too peaceful, given the circumstances. And his hands, Sarah noticed immediately, were positioned in a way that no dead man's hands should be: clasped together, palms up, as if he'd been holding something. As if he'd been offering something to the sea.

"What was he holding?" Sarah asked.

Cooper shifted his weight. "That's just it. We don't know. Whatever it was, it's gone now. Taken by the tide, maybe, or—" He stopped.

"Or what?"

"Or someone took it before we got here."

Sarah looked at the harbor, at the water that had been her first love and her greatest fear, and felt the familiar pull. The sea was hiding something. She could feel it the way she felt changes in pressure—deep, bone-level, undeniable.

And she was going to find out what it was, even if it meant diving into waters she'd sworn never to enter again.`,
        fullContent: `The body was the third one that month, and this time, it was personal.

Dr. Sarah Whitmore stood at the edge of the harbor, watching the police tape flutter in the salt wind, and tried to remember how to breathe. She'd been back in Thornhaven for exactly forty-seven hours, and already the town was living up to its reputation: beautiful from a distance, treacherous up close.

[CONTINUED - Full content available to members only]

Three bodies in three weeks. All fishermen. All found in or near the harbor, with the same strange positioning—hands clasped, palms up, as if making an offering. And all missing whatever they'd been holding.

The local police were baffled. DI Cooper, who'd been Sarah's classmate in primary school and still called her "Whitmore" in the way that suggested he'd never quite forgiven her for being better at science, was running out of theories and patience in equal measure.

"It's not murder," he insisted. "The autopsies show no signs of violence. No drowning, no trauma, no poison. It's like they just... stopped."

"People don't just stop," Sarah said.

"These ones did."

But Sarah knew something Cooper didn't—something she hadn't told anyone, because it sounded impossible and she was a scientist who dealt in possibilities. The harbor water was wrong. Not polluted, not contaminated in any way she could measure, but wrong. The salinity was off. The temperature was wrong. And the sonar readings she'd taken that morning showed a formation at the bottom of the harbor that hadn't been there six months ago.

A formation that looked, if she squinted at the readings and suspended her disbelief, like a door.

[The full thriller takes readers to the bottom of the North Sea, into a mystery that connects ancient folklore with cutting-edge marine science, and asks the question: what happens when we find something in the deep that was meant to stay hidden?]`,
        coverImage: '/images/books/book6.png',
        genre: 'Thriller',
        publishedDate: '2024',
        featured: true,
        order: 6,
      },
    }),
  ]);

  console.log(`📚 Created ${books.length} books`);

  // Seed Blog Posts
  const posts = await Promise.all([
    db.blogPost.upsert({
      where: { slug: 'where-stories-come-from' },
      update: {},
      create: {
        title: 'Where Stories Come From',
        slug: 'where-stories-come-from',
        excerpt: 'Every story begins somewhere—a whisper, a what-if, a moment that refuses to be forgotten. In this post, I share the surprising origins of my novels and the moments of everyday magic that spark my imagination.',
        content: `# Where Stories Come From

Every story begins somewhere—a whisper, a what-if, a moment that refuses to be forgotten.

I've been asked this question hundreds of times: "Where do you get your ideas?" And I always give the same honest, unsatisfying answer: everywhere. The real question isn't where ideas come from—it's which ones are worth following.

## The Letter That Started It All

*The Shadows of Thornfield Hall* began with a letter. Not a mysterious anonymous letter, like the one Eleanor receives in the novel, but a real letter I found in a second-hand bookshop in York. It was tucked inside a copy of *Jane Eyre*—a love letter, written in 1947, from a man named Thomas to a woman named Margaret. He was desperate to see her again. He signed off: "Yours, in this life and the next."

I never found out if Margaret wrote back. But I couldn't stop thinking about Thomas, about that declaration of love suspended in time, and about all the letters that are written but never sent. That wondering became Thornfield Hall.

## The Amber Coast

*Letters from the Amber Coast* was inspired by my grandmother. She was Estonian, born in Tallinn in 1924, and she rarely spoke about her life before she came to England. When she died, we found a box of photographs and letters in her attic—evidence of a whole life we'd never known about. A life that included, it turned out, a man who was not my grandfather.

That discovery shook our family, but it also gave me something precious: the understanding that every person carries stories we never hear. We see our parents and grandparents as fixed points, but they were young once, too. They loved and lost and chose and regretted. That's what *Letters from the Amber Coast* is really about—the people our loved ones were before we knew them.

## Finding Your Own Stories

My advice to aspiring writers is simple: pay attention. The world is full of stories waiting to be told. They're in the conversations you overhear on trains, in the objects you find in old houses, in the questions that keep you up at night. You don't need to invent something from nothing. You just need to listen closely enough to hear what the world is already saying.

And then write it down. Even if it's terrible. Especially if it's terrible. Because the first draft is just you telling yourself the story. The magic happens in the rewriting.

*Until next time, keep reading between the lines.*

—Simon`,
        coverImage: '/images/blog/blog1.png',
        author: 'Simon J Cleary',
        published: true,
        publishedAt: new Date('2024-11-15'),
      },
    }),
    db.blogPost.upsert({
      where: { slug: 'rainy-days-and-reading' },
      update: {},
      create: {
        title: 'Rainy Days and Reading: Why We Love Books When It Rains',
        slug: 'rainy-days-and-reading',
        excerpt: 'There\'s something magical about reading on a rainy day. But why? I explore the science and sentiment behind our love of books when the weather turns grey.',
        content: `# Rainy Days and Reading: Why We Love Books When It Rains

There's something magical about reading on a rainy day. But why? I've been thinking about this a lot lately, as autumn settles in and the rain becomes a more frequent companion.

## The Comfort of Containment

I think it starts with permission. On a sunny day, there's a quiet pressure to be outside, to be productive, to make the most of the light. But rain gives us permission to stay in. It draws a boundary around our world and says: "This is enough. You are enough. Just be here, in this moment, with this book."

Psychologists call this "cozy theory"—the idea that we seek out experiences that make us feel safe and contained when the outside world feels threatening. Rain is the ultimate boundary-maker. It turns our homes into shelters and our reading chairs into sanctuaries.

## The Sound of Rain

And then there's the sound. Studies have shown that the sound of rain produces pink noise—a type of background sound that's been shown to improve concentration and promote deep sleep. It's no coincidence that some of our best reading happens during storms. The rain creates a kind of acoustic cocoon that makes it easier to lose ourselves in a story.

## My Rainy Day Reading List

If you're looking for the perfect rainy-day read, here are some of my favourites:

1. **Rebecca** by Daphne du Maurier — The ultimate "sitting by the window while it pours" novel
2. **The Shadow of the Wind** by Carlos Ruiz Zafón — A love letter to books set in rainy Barcelona
3. **The Secret History** by Donna Tartt — Dark academia at its finest
4. ** Norwegian Wood** by Haruki Murakami — Melancholy and beautiful
5. **The Thirteenth Tale** by Diane Setterfield — Gothic mystery perfect for dark afternoons

## What Rain Teaches Us About Stories

Perhaps the deepest connection between rain and reading is this: both remind us that beauty exists in stillness. A rainy day asks us to slow down, to listen, to notice the small things. A good book does the same.

The next time it rains, don't fight it. Make a cup of tea, find your favourite chair, and open a book. The story will meet you where you are.

*Happy reading,*

—Simon`,
        coverImage: '/images/blog/blog2.png',
        author: 'Simon J Cleary',
        published: true,
        publishedAt: new Date('2024-10-28'),
      },
    }),
    db.blogPost.upsert({
      where: { slug: 'art-of-the-first-chapter' },
      update: {},
      create: {
        title: 'The Art of the First Chapter',
        slug: 'art-of-the-first-chapter',
        excerpt: 'The first chapter is a promise. It tells the reader what kind of story they\'re about to enter and whether they should trust the teller. Here\'s how I craft openings that keep readers turning pages.',
        content: `# The Art of the First Chapter

The first chapter is a promise. It tells the reader what kind of story they're about to enter and whether they should trust the teller.

I've rewritten more first chapters than I care to admit. Some novels have had five or six different openings before I found the one that felt right. And by "felt right," I mean: the one that made me want to keep writing.

## What a First Chapter Must Do

A good first chapter accomplishes three things:

1. **It introduces a voice.** Before we care about plot or character, we need to care about the storyteller. Voice is the handshake between writer and reader—the moment when we decide whether we're in good hands.

2. **It raises a question.** Not necessarily a mystery (though that helps), but a question about the world or the characters that makes us need to know more. "What happened here?" "Who is this person?" "Why are they doing that?"

3. **It establishes a contract.** Every story makes an implicit contract with its reader about tone, pace, and the kind of experience they can expect. A thriller's first chapter promises suspense. A romance promises love. Literary fiction promises... well, that's more complicated.

## My Favourite First Lines

- "It was a bright cold day in April, and the clocks were striking thirteen." — George Orwell, *1984*
- "Last night I dreamt I went to Manderley again." — Daphne du Maurier, *Rebecca*
- "It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York..." — Sylvia Plath, *The Bell Jar*

Each of these lines does something remarkable: they create an entire atmosphere in a single sentence. They make us lean in. They make us need the next sentence.

## How I Write First Chapters Now

After years of struggling with openings, I've developed a simple approach: I write the first chapter last. I need to know the whole story before I can promise the reader what it will be. It's like planning a journey—you can't write the invitation until you know the destination.

Then I rewrite. And rewrite. And rewrite again. Because the first chapter isn't just the beginning of the story—it's the beginning of the relationship between the story and the reader. And that relationship, like all good ones, deserves to start well.

*Write on,*

—Simon`,
        coverImage: '/images/blog/blog3.png',
        author: 'Simon J Cleary',
        published: true,
        publishedAt: new Date('2024-09-12'),
      },
    }),
  ]);

  console.log(`📝 Created ${posts.length} blog posts`);
  console.log('✅ Seeding complete!');
}

seed()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

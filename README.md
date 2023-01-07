# Hunterbot

Hunterbot is an attempt to give personality, strong opinions, and a voice to a chatbot. This is one example in a larger project intented to push the boundaries of bot embodyment by exploring how to extend the domain of chatbots (by giving them voices, strong personalities, the ability to browse the interet, and other senses such as hearing).

## Tech stack
Hunterbot is made with React, Node/Express, OpenAi, NewsAPI, and AWS lambda/Amazon polly. User input is either sent directly to the OpenAI API, or a query is made to the NewsAPI to select a random news article and then ask Hunterbot's opinion on the news, then is routed to an AWS lambda that runs the text through Polly, creates an audio file, saves the file in an S3 bucket and returns the file's URL to the front end to be automatically played in a React audio component. 

## Lessons Learned 
My main takeaway is that I need to determine a go-to rate-limiting system for my growing suite of API's, as I feel this task always takes me longer than is necessary, and this is one I should either automate or write into a reusable component. 

# GPT artistic chatbot frontend
"I'm not Hunter S Thompson, and I don't approve this message."

MEMETIC PROXIMITY

Perhaps the most interesting thing about this bot is that it is *not* a fine-tuned model of Hunter S Thompson based on his writings. It is, rather, GPT-3/Davinci-003's current prompt-level understanding of who Hunter S Thompson was, and what he might sound like in conversation. Thus, we are using a technique some call "Memetic proximity" to tease out responses unique from GPT-3's baseline, which, especially in the form of ChatGPT, tend to avoid putting forward strong or highly speculative opinions (both of which Hunter was well known for).

If you chat with Hunter about the events of his time, he is likely to give you a reasonably in-character response. When you give him a modern news article, the accuracy is about 50-50: sometimes it sounds incredibly similar to an opinion he might have about modern news (although lacking the true bite of language he possesed), while at other times, GPT's context limitations come through.

Perhaps more interestingly, there are times when the contrarian nature of his voices causes him to critique mainstream media, and others when he seems to be essentially parroting state department propoganda. What causes the difference in response is an interesting topic to explore. 

"In the sociological sense, recuperation is the process by which politically radical ideas and images are twisted, co-opted, absorbed, defused, incorporated, annexed or commodified within media culture and bourgeois society, and thus become interpreted through a neutralized, innocuous or more socially conventional perspective. More broadly, it may refer to the cultural appropriation of any subversive symbols or ideas by mainstream culture" https://en.wikipedia.org/wiki/Recuperation_(politics)

Many out-of-the-box chatbot responses, especially from LLMs produced by corporate entities, are incredible at analyzing data, but rather lacking in the "personality and opinions" category. Although you can try to brute-force a certain disposition and ideology by explicitly stating these in a prompt, many noted that Memetic proximity, i.e. filtering the prompt through the viewpoint of a known cultural meme (whether a famous person or fictitious entity) is an interesting technique that can yield noticable results. 

Yet the mimicing of voices and digital imprints poses many philosophical and political questions, as well as ethical concerns.

Who was Hunter S Thompson, according to GPT-3? With how much fidelity can he be represented? Are the strong personalities and prolific bodies of work of certain individuals better able to "override" the default opinions of GPT3? (And within this, how does the racist nature of many current datasets affect the fidelity of representation of digital imprints of thinkers of color?)

As more people will be cloned (voluntarily our otherwise) using these techniques, we must also ask ourselves how the opinions of these models will seep into the discourse as "granted", and then ponder what these opinions might be and whether we want them to continue to be the basis of our cultural discourse as we move into the future. 

Next up:

I will off the ability to experiment with different Memetic agents so we can make interesting discoveries about how their personalities come through. 

Next, I will be fine-tuning this model on interviews with Dr. Thompson to see how this changes hunterbot. My prediction is that it will increase the fidelity of his temperment and prosidy, but might limit his range of information and opinions to the fine-tuning dataset. 

I will also extend his ability to leave the sandbox and search for information on the Internet, ideally by plugging him into datasources the most similar to those he used in his lifetime (with the sad exception, of course, of his favorite source: being there).

I might also hook him up to image-to-text and audio-to-text to give him the ability to "see" and "hear", to some extent. 

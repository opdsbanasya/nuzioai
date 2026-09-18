import News from '../models/news.js';
import * as googleTTS from 'google-tts-api';

export const getNews = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      const categoriesArray = category.split(',').map(c => {
        const cat = c.trim().toLowerCase();
        if (cat === 'ai') return 'technology';
        return cat;
      });
      query.category = { $in: categoriesArray };
    }

    const newsDocs = await News.find(query).sort({ publishedAt: -1 }).limit(50).lean();
    
    // Generate dynamic TTS audio URLs for each news item's summary
    const news = newsDocs.map(item => {
      try {
        const textToSpeech = item.summary.length > 200 ? item.summary.substring(0, 197) + '...' : item.summary;
        const audioUrl = googleTTS.getAudioUrl(textToSpeech, {
          lang: 'en',
          slow: false,
          host: 'https://translate.google.com',
        });
        return { ...item, audioUrl };
      } catch (err) {
        // Fallback if text is too long (over 200 chars) or fails
        return item;
      }
    });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const seedNews = async (req, res) => {
  try {
    // Wipe existing news
    await News.deleteMany({});

    const newsData = [
      {
        title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
        category: 'technology',
        source: 'The Verge',
        readTime: '3 MIN',
        duration: '03:47',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Anthropic's new memory layer lets Claude hold entire codebases in mind while it works, challenging OpenAI's dominance.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Nvidia overtakes Microsoft as most valuable company amid AI boom.',
        category: 'markets',
        source: 'Bloomberg',
        readTime: '4 MIN',
        duration: '04:12',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The chipmaker's market capitalization reached an unprecedented high today, driven by insatiable demand for its specialized AI hardware.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Y Combinator announces new batch with 60% AI startups.',
        category: 'startups',
        source: 'TechCrunch',
        readTime: '2 MIN',
        duration: '02:30',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The prestigious accelerator continues its heavy pivot into generative AI, funding dozens of new foundational model applications.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'New electric vehicle battery charges to 100% in 5 minutes.',
        category: 'science',
        source: 'Wired',
        readTime: '5 MIN',
        duration: '05:20',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Researchers have achieved a breakthrough in solid-state battery technology, practically eliminating range anxiety for EVs.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Sensex hits all-time high as foreign inflows continue.',
        category: 'markets',
        source: 'Moneycontrol',
        readTime: '3 MIN',
        duration: '03:15',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Indian equities rallied on positive global cues and a strong influx of FII capital in the financial sector.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'SpaceX Starship completes successful orbital test flight.',
        category: 'science',
        source: 'Space.com',
        readTime: '4 MIN',
        duration: '04:05',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The mega-rocket achieved all its primary objectives, paving the way for future lunar missions.",
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Apple unveils mixed reality headset at WWDC.',
        category: 'technology',
        source: 'CNET',
        readTime: '6 MIN',
        duration: '06:10',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The highly anticipated device promises to blend digital content with the physical world seamlessly.",
        image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Global crypto regulations take shape after G20 summit.',
        category: 'markets',
        source: 'Reuters',
        readTime: '3 MIN',
        duration: '03:50',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Leaders agree on a coordinated approach to regulate digital assets and prevent illicit activities.",
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Fintech startup Stripe raises $6.5 billion in fresh funding.',
        category: 'startups',
        source: 'TechCrunch',
        readTime: '2 MIN',
        duration: '02:15',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The payments giant secures massive funding round at a $50B valuation to fuel global expansion.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Quantum computing milestone reached by Google researchers.',
        category: 'technology',
        source: 'Nature',
        readTime: '5 MIN',
        duration: '05:30',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Team demonstrates quantum error correction, a crucial step towards practical quantum computers.",
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'CRISPR treatment for sickle cell disease approved by FDA.',
        category: 'science',
        source: 'NY Times',
        readTime: '4 MIN',
        duration: '04:45',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Historic approval marks the first gene-editing therapy available for patients in the US.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbd15805?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'OPEC+ announces surprise oil production cuts.',
        category: 'markets',
        source: 'Financial Times',
        readTime: '3 MIN',
        duration: '03:20',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Oil prices surge following the group's decision to reduce output by over 1 million barrels a day.",
        image: "https://images.unsplash.com/photo-1581699924510-75b22b62d854?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'India lands Chandrayaan-3 successfully near the lunar south pole.',
        category: 'science',
        source: 'ISRO',
        readTime: '5 MIN',
        duration: '05:50',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "India becomes the first nation to successfully land a spacecraft in this challenging and unexplored region of the Moon.",
        image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'OpenAI rolls out GPT-5 with multimodal reasoning capabilities.',
        category: 'technology',
        source: 'The Verge',
        readTime: '4 MIN',
        duration: '04:25',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The latest iteration of the popular AI model can seamlessly analyze text, images, and audio simultaneously.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'S&P 500 enters bull market territory.',
        category: 'markets',
        source: 'WSJ',
        readTime: '3 MIN',
        duration: '03:10',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Broad market rally lifts stocks 20% above their recent lows, signaling renewed investor optimism.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'New fusion reactor design promises net-positive energy.',
        category: 'science',
        source: 'MIT Tech Review',
        readTime: '5 MIN',
        duration: '05:15',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "A novel magnetic confinement approach could bring commercially viable fusion power closer to reality.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Healthtech startup raises $100M for AI-driven diagnostics.',
        category: 'startups',
        source: 'VentureBeat',
        readTime: '2 MIN',
        duration: '02:45',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "The Series C round will accelerate the deployment of AI tools in hospitals across North America.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Cybersecurity concerns rise amid new sophisticated ransomware.',
        category: 'technology',
        source: 'ZDNet',
        readTime: '4 MIN',
        duration: '04:00',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "A new strain of malware is targeting critical infrastructure, prompting warnings from government agencies.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Fed pauses interest rate hikes after year-long tightening cycle.',
        category: 'markets',
        source: 'CNBC',
        readTime: '3 MIN',
        duration: '03:30',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Central bank opts to leave rates unchanged as inflation shows signs of cooling.",
        image: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&q=80&w=400&h=200"
      },
      {
        title: 'Climate tech funding defies broader venture capital slowdown.',
        category: 'startups',
        source: 'PitchBook',
        readTime: '3 MIN',
        duration: '03:45',
        audioUrl: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
        summary: "Investors continue to pour money into renewable energy and carbon capture startups despite economic headwinds.",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=400&h=200"
      }
    ];

    const seededData = newsData.map(item => {
      try {
        const textToSpeech = item.summary.length > 200 ? item.summary.substring(0, 197) + '...' : item.summary;
        const audioUrl = googleTTS.getAudioUrl(textToSpeech, {
          lang: 'en',
          slow: false,
          host: 'https://translate.google.com',
        });
        
        // Estimate duration based on word count (approx 150 words per minute = 2.5 words per second)
        const wordCount = item.summary.split(/\s+/).length;
        const audioDuration = Math.ceil(wordCount / 2.5);

        return { ...item, audioUrl, audioDuration };
      } catch (err) {
        return item; // Fallback to Kalimba if fails
      }
    });

    await News.insertMany(seededData);

    res.status(200).json({ message: "Successfully seeded 20 news items!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

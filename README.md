# Live-Evo Project Website

This is the official project website for **Live-Evo: Online Evolution of Agentic Memory from Continuous Feedback**.

## Overview

Live-Evo is an online self-evolving memory system that learns from a stream of incoming data over time. It decouples *what happened* from *how to use it* via an Experience Bank and a Meta-Guideline Bank, compiling task-adaptive guidelines from retrieved experiences for each task.

### Key Results
- **20.8%** improvement in Brier Score
- **12.9%** increase in market returns
- Evaluated on Prophet Arena benchmark over a 10-week horizon

## Website Structure

```
live-evo-website/
├── index.html          # Main HTML page
├── style.css           # CSS styling
├── script.js           # Interactive demo functionality
├── assets/
│   └── images/         # Figures and diagrams
│       ├── fig2public.png
│       ├── cumulative_portfolio_value.png
│       ├── brier_score_comparison.png
│       └── case_study.png
└── README.md
```

## Sections

1. **Our Framework** - Explains the four-stage evolutionary loop: Retrieve, Compile, Act, Update
2. **Why Live-Evo** - Compares traditional vs. continuous memory evolution approaches
3. **Performance** - Shows benchmark results and comparisons
4. **Live Demo** - Interactive walkthrough of the pipeline

## Deployment

### GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select "Deploy from a branch" and choose `main` branch
4. Your site will be available at `https://<username>.github.io/<repo-name>/`

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

## Citation

```bibtex
@article{zhang2025liveevo,
  title={Live-Evo: Online Evolution of Agentic Memory from Continuous Feedback},
  author={Zhang, Yaolun and Wu, Yiran and Yu, Yijiong and Wu, Qingyun and Wang, Huazheng},
  journal={arXiv preprint arXiv:2501.xxxxx},
  year={2025}
}
```

## Links

- [Paper](https://arxiv.org/abs/2501.xxxxx)
- [Code Repository](https://github.com/ag2ai/Live-Evo)
- [AG2 AI](https://ag2.ai)

## License

This project is part of AG2 AI research.

# Delamain

AI-powered vehicle predictive maintenance system using IBM WatsonX Orchestrate.

## Overview

Delamain monitors vehicle fleets and autonomously coordinates diagnostics and repairs using a 3-agent AI system powered by real telematics data.

## Features

- Real-time vehicle diagnostics with DTC code analysis
- Automated service appointment booking
- Multi-agent orchestration (Conductor, Diagnostician, Service Manager)
- Integration with vehicle telematics and service history data

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **AI**: IBM WatsonX Orchestrate (ReAct agents)
- **Workflow**: n8n
- **Data**: Google Sheets

## Project Structure

```
Delamain/
├── datasets/           # Vehicle data (telematics, service history, DTC codes)
├── frontend/          # Next.js web application
├── workflows/         # n8n workflow configurations
└── OPENAPI 3.0.yaml   # API specification
```

## Getting Started

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Datasets

- **Telematics**: Real-time vehicle sensor data
- **Service History**: Past repair records
- **DTC Codes**: Diagnostic trouble code reference

## License

Private

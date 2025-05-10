pipeline {
  agent any

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci' //  Use bat only
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat 'npx playwright install' 
        bat 'npx playwright test --reporter=html'
      }
    }

    stage('Publish HTML Report') {
      steps {
        publishHTML(target: [
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright HTML Report'
        ])
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'test-results/**/*, playwright-report/**/*', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      junit 'test-results/**/*.xml' 
    }

    failure {
      echo 'Build failed. Check the report.'
    }
  }
}
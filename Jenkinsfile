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
        bat 'npm ci'
      }
    }

    stage('Run Playwright tests') {
      steps {
        bat 'npx playwright install' 
        bat 'npx playwright test'
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

    stage('Publish Test Results') {
      steps {
        junit 'test-results.xml'
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'results/**/*, playwright-report/**/*', allowEmptyArchive: true
      }
    }
  }

  stage('Debug file listing') {
  steps {
    bat 'dir /s /b > filelist.txt'
    archiveArtifacts artifacts: 'filelist.txt'
  }
}

  post {
    always {
      junit 'results/test-results.xml' 
    }

    failure {
      echo 'Build failed. Check the report.'
    }
  }
}
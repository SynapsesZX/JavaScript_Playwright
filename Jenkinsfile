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
        bat 'npx playwright install' 
      }
    }

    stage('Run API Tests') {
      steps {
        bat 'npx playwright test tests/apiPetstore'
      }
    }

    stage('Run UI Tests') {
      steps {
        bat 'npx playwright test tests/Rozetka'
      }
    }

    stage('Publish HTML Report') {
      steps {
        script {
          publishHTML(target: [
            allowMissing: true,             
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'playwright-report',
            reportFiles: 'index.html',
            reportName: 'Playwright HTML Report'
          ])
        }
      }
    }

    stage('Publish Test Results') {
      steps {
        script {
          
          catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            junit testResults: 'results/results.xml', allowEmptyResults: true
          }
        }
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'results/**/*, playwright-report/**/*', allowEmptyArchive: true
      }
    }

    stage('Debug file listing') {
      steps {
        bat 'dir /s /b > filelist.txt'
        archiveArtifacts artifacts: 'filelist.txt'
      }
    }
  }

  post {
    always {
      script {
        
        catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
          junit testResults: 'results/results.xml', allowEmptyResults: true
        }

        publishHTML(target: [
          allowMissing: true,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright HTML Report'
        ])
      }
    }

    failure {
      echo 'Build failed. Check the report.'
    }
  }
}
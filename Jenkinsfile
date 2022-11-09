pipeline{
    agent none
    tools {
        nodejs 'node-v16'
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage("Build and Deploy Staging"){
            when {
                branch 'staging'
            }            
            agent {
                node {
                    label "stg"
                    customWorkspace "/var/www/patient"
                }
            }
            steps{
                echo 'BUILD EXECUTION STARTED'
                sh "node -v"
                sh "cp config/next.config.stg next.config.js"
                sh "npm install"
                sh "npm run build"
            }
        }
        stage("Build and Deploy Production"){
            when {
                branch 'main'
            }            
            agent {
                node {
                    label "prod"
                    customWorkspace "/var/www/patient"
                }
            }
            steps{
                echo 'BUILD EXECUTION STARTED'
                sh "node -v"
                sh "cp config/next.config.prod next.config.js"
                sh "npm install"
                sh "npm run build"
            }
        }
    }
}
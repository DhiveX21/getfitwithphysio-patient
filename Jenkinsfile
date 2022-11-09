pipeline{
    agent none
    tools {
        nodejs 'node-v16'
    }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage("Build Staging"){
            when {
                branch 'staging'
            }            
            agent {
                node {
                    label "stg"
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
        stage("Deploy to Staging"){
            when {
                branch 'staging'
            }            
            agent {
                node {
                    label "stg"
                }
            }
            steps{
                echo 'DEPLOY EXECUTION STARTED'
                sh "sudo mkdir -p /var/www/patient && sudo cp -a .next/. /var/www/patient/"
            }
        }
    }
}
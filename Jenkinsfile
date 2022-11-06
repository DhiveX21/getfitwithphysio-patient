pipeline{
    agent {
        node {
            label "fe"
        }
    }
    tools {
        nodejs 'node-v16'
    }
    stages {
        stage("Build"){
            steps{
                echo 'BUILD EXECUTION STARTED'
                sh "sudo su root"
                sh "whoami"
                sh "node -v"
                sh "npm install"
                yarn "install"
                sh "npm run build"
            }
        }
    }
}
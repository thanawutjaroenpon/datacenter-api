#!/bin/bash

RUNNIG_MODE="dev"

expose_command () {
	for cmd in "$@"
	do
		case $cmd in
			-d | --dev )
				RUNNIG_MODE="dev"
				;;
			-p | --prod )
				RUNNIG_MODE="prod"
				;;
		esac
	done
}

start_service () {
	echo ""
	case $RUNNIG_MODE in
		dev)
			echo "Starting service in development mode . . ."
			docker-compose -f docker-compose.yml up --build --force-recreate
		;;
		prod)
			echo "Starting service in production mode . . ."
			docker-compose -f docker-compose.yml up --build --force-recreate -d
		;;
	esac
}

# Close all running containers
echo ""
echo "Close all running containers . . ."
docker-compose down

# Extract command
expose_command $@

# Start services
start_service
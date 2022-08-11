class Visualizer {
    static drawNetwork(ctx, network) {
        const margin = 50;
        const top = margin;
        const left = margin;
        const width = ctx.canvas.width - 2 * margin;
        const height = ctx.canvas.height - 2 * margin;
        const levelHeight = height / network.levels.length;


        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop = top + lerp(height - levelHeight, 0, network.levels.length == 1 ? 0.5 : i /
                (network.levels.length - 1));
            Visualizer.drawLevel(ctx, network.levels[i], left, levelTop, width, levelHeight, network.levels.length == 1 ? ["up", "left", "right", "down"] : []);
        }
    }

    static drawLevel(ctx, level, left, top, width, height, outputLabels) {
        const right = left + width;
        const bottom = top + height;
        const { inputs, outputs, weights, biases } = level;
        const nodeRadius = 18;

        // drawing connections
        for (let i = 0; i < inputs.length; i++) {
            for (let j = 0; j < outputs.length; j++) {
                ctx.setLineDash([7, 3]);

                ctx.beginPath();
                ctx.moveTo(Visualizer.#getNodeX(inputs, left, right, i), bottom);
                ctx.lineTo(Visualizer.#getNodeX(outputs, left, right, j), top);
                ctx.lineWidth = 2;
                ctx.strokeStyle = getRGBA(weights[i][j]);
                ctx.stroke();
            }
            // drawing inputs
            for (let i = 0; i < inputs.length; i++) {
                const x = Visualizer.#getNodeX(inputs, left, right, i);
                ctx.beginPath();
                ctx.arc(x, bottom, nodeRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2, false);
                ctx.fillStyle = getRGBA(inputs[i]);
                ctx.fill();
            }

            // drawing outputs
            for (let i = 0; i < outputs.length; i++) {
                const x = Visualizer.#getNodeX(outputs, left, right, i);
                ctx.beginPath();
                ctx.arc(x, top, nodeRadius, 0, Math.PI * 2, false);
                ctx.fillStyle = "black";
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2, false);
                ctx.fillStyle = getRGBA(outputs[i]);
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2, false);
                ctx.strokeStyle = getRGBA(biases[i]);
                ctx.setLineDash([3, 3]);
                ctx.stroke();
                ctx.setLineDash([]);

                // if (outputLabels[i]) {
                //     ctx.beginPath();
                //     ctx.textAlign = "center";
                //     ctx.textBaseline = "middle";
                //     ctx.fillStyle = "black";
                //     ctx.strokeStyle = "white";
                //     ctx.font = (nodeRadius * 1.5) + "px Arial";
                //     ctx.fillText(outputLabels[i], x, top);
                //     ctx.lineWidth = 0.5;
                //     ctx.strokeText(outputLabels[i], x, top);
                // }
            }
        }
    }
    static #getNodeX(nodes, left, right, index) {
        return lerp(left, right, nodes.length == 1 ? 0.5 : index / (nodes.length - 1));
    }
}
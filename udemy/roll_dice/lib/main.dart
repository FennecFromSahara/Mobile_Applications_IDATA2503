import 'package:flutter/material.dart';

import 'package:roll_dice/gradient_container.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: GradientContainer(
          colors: const [
            Color.fromARGB(255, 183, 125, 58),
            Color.fromARGB(255, 220, 131, 72),
          ],
        ),
      ),
    ),
  );
}

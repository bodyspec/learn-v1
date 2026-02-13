# How DEXA Works

DEXA (Dual-Energy X-ray Absorptiometry) is the clinical reference standard for measuring body composition[^1]. Originally developed for bone density assessment, DEXA technology has evolved to provide highly accurate measurements of fat mass, lean mass, and bone mineral content.

## The Technology

![Dual-energy X-ray beams passing through tissue](/content/assets/diagrams/dexa-dual-energy.png)

DEXA scanners emit two low-energy X-ray beams at different energy levels (typically around 40 keV and 70 keV). As these beams pass through the body, different tissues attenuate them at different rates based on their atomic composition and density[^1]:

- **Bone** attenuates the most energy due to its high mineral content
- **Lean tissue** attenuates moderate energy
- **Fat tissue** attenuates the least energy

The scanner's detectors measure the ratio of attenuation between the two beam energies at each pixel, allowing the software to calculate the composition of tissue at every point along the scan.

:::note
The radiation exposure from a DEXA body composition scan is extremely low—approximately 1-10 microsieverts (μSv), compared to ~20-100 μSv for a chest X-ray or ~30-40 μSv for a coast-to-coast flight[^2].
:::

## Three-Compartment Model

![Three-compartment model: fat, lean, and bone](/content/assets/diagrams/three-compartment-model.png)

DEXA uses a three-compartment model, which distinguishes between[^1]:

1. **Bone mineral content (BMC)** — The mineral portion of your bones
2. **Fat mass** — All adipose tissue in the body
3. **Lean soft tissue** — Muscle, organs, water, and everything else that isn't bone or fat

This is more detailed than two-compartment models (like BIA scales) that only distinguish between fat and fat-free mass, providing better accuracy for clinical and research applications[^3].

## The Scanning Process

![Person lying on DEXA scanning table](/content/assets/diagrams/dexa-scan-position.png)

During a BodySpec scan:

1. You lie still on a padded table in light clothing
2. The scanner arm passes over your body from head to toe
3. The scan takes approximately 6-7 minutes
4. Software processes the data to create a detailed body composition report

## Regional Analysis

![Body outline showing arm, leg, and trunk divisions](/content/assets/diagrams/regional-divisions.png)

One of DEXA's key advantages is its ability to provide **regional analysis**. The scan divides the body into segments:

- Arms (left and right separately)
- Legs (left and right separately)
- Trunk (further divided into android and gynoid regions)

This allows for identification of asymmetries and specific areas of concern—something no other non-imaging body composition method can provide.

:::clinical
Regional analysis is particularly valuable for detecting muscle imbalances that may increase injury risk, or for tracking recovery after injury or surgery.
:::

## What DEXA Cannot Measure

While DEXA is highly accurate for body composition, it has limitations:

- Cannot distinguish between intramuscular fat and muscle tissue
- Cannot determine muscle fiber type (slow-twitch vs. fast-twitch)
- Cannot directly measure hydration status (though hydration affects accuracy)
- Cannot assess muscle quality or function

Understanding these limitations helps set appropriate expectations for what insights a DEXA scan can provide.

## References

[^1]: Shepherd JA, Ng BK, Sommer MJ, Heymsfield SB. "Body composition by DXA." *Bone*. 2017;104:101-105. doi:10.1016/j.bone.2017.06.010
[^2]: International Atomic Energy Agency. "Radiation protection of patients during DXA." IAEA RPOP. Available at: https://www.iaea.org/resources/rpop/health-professionals/other-specialities-and-imaging-modalities/dxa-bone-mineral-densitometry/patients
[^3]: Toombs RJ, Ducher G, Shepherd JA, De Souza MJ. "The impact of recent technological advances on the trueness and precision of DXA to assess body composition." *Obesity*. 2012;20(1):30-39. doi:10.1038/oby.2011.211
